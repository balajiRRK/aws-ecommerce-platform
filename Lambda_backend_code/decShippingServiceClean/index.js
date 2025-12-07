// Shipping Lambda for Obj2 – writes into shippingservice.shipments + publishes SNS notification

const mysql = require('mysql');
const util = require('util');

// ---------- SNS CLIENT (NEW) ----------
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const sns = new SNSClient();
const NOTIFICATIONS_TOPIC_ARN = process.env.NOTIFICATIONS_TOPIC_ARN;

// Optional helper to publish shipment notification to SNS
const publishShipmentNotification = async (payload) => {
  if (!NOTIFICATIONS_TOPIC_ARN) {
    console.warn('NOTIFICATIONS_TOPIC_ARN is not set; skipping SNS publish');
    return;
  }

  const message = {
    ...payload,
    eventType: 'ShipmentInitiated',
    source: 'shippingservice',
    timestamp: new Date().toISOString(),
  };

  const params = {
    TopicArn: NOTIFICATIONS_TOPIC_ARN,
    Subject: `Shipment initiated for order ${payload.orderId}`,
    Message: JSON.stringify(message, null, 2),
  };

  await sns.send(new PublishCommand(params));
};

// ---------- UUID SETUP ----------

let uuidv4;
const setupUUIDV4 = async () => {
  const { v4 } = await import('uuid');
  uuidv4 = v4;
};

// ---------- DB CONNECTION ----------

const createShippingDbConnection = () => {
  const conn = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME || 'shippingservice', // we set DB_NAME=shippingservice
  });
  conn.query = util.promisify(conn.query).bind(conn);
  return conn;
};

// ---------- EVENT DATA EXTRACTION ----------

const extractShippingData = (event) => {
  let data = {};

  // 1) EventBridge detail (normal async flow)
  if (event && event.detail) {
    data = event.detail;
  } else if (typeof event.body === 'string') {
    // 2) Direct invoke with string body
    try {
      data = JSON.parse(event.body);
    } catch (e) {
      console.error('Failed to parse event.body in shipping handler:', e);
      data = {};
    }
  } else if (event && typeof event.body === 'object') {
    // 3) Direct invoke with object body
    data = event.body;
  } else if (event && typeof event === 'object') {
    // 4) Fallback: whole event is the payload
    data = event;
  }

  const orderId =
    data.orderId || data.order_id || data.orderID || null;

  const businessId =
    data.businessId || data.business_id || data.storeRegistrationId || null;

  // shippingAddress can be an OBJECT (from EventBridge) or a STRING (from manual tests)
  const addrSource = data.shippingAddress || data.shipmentAddress || data.address || null;
  let shipmentAddress = null;

  if (addrSource && typeof addrSource === 'object') {
    const {
      address1,
      address2,
      city,
      state,
      country,
      zip,
    } = addrSource;

    const cityState =
      city && state ? `${city}, ${state}` : (city || state || '');

    shipmentAddress = [
      address1,
      address2,
      cityState,
      country,
      zip,
    ].filter(Boolean).join(', ');
  } else if (typeof addrSource === 'string') {
    shipmentAddress = addrSource;
  } else {
    shipmentAddress = null;
  }

  const numPacketsRaw =
    data.numPackets || data.numberOfPackets || data.packetCount || null;

  const packetWeightRaw =
    data.packetWeightLb ||
    data.packet_weight_lb ||
    data.weightPerPacket ||        // <-- from decInventoryManagement
    data.approxWeightPerPacket ||
    null;

  const numPackets =
    numPacketsRaw != null ? parseInt(numPacketsRaw, 10) : null;
  const packetWeightLb =
    packetWeightRaw != null ? parseFloat(packetWeightRaw) : null;

  console.log('Extracted shipping data:', {
    orderId,
    businessId,
    shipmentAddress,
    numPackets,
    packetWeightLb,
  });

  return { orderId, businessId, shipmentAddress, numPackets, packetWeightLb };
};

// ---------- MAIN HANDLER ----------

exports.handler = async (event) => {
  let connection;
  try {
    if (!uuidv4) {
      await setupUUIDV4();
    }

    console.log('Shipping handler received event:', JSON.stringify(event));

    const {
      orderId,
      businessId,
      shipmentAddress,
      numPackets,
      packetWeightLb,
    } = extractShippingData(event);

    // Basic validation according to Obj2
    if (!orderId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'orderId is required' }),
      };
    }

    if (!businessId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'businessId is required' }),
      };
    }

    if (!shipmentAddress || shipmentAddress.trim() === '') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'shipmentAddress is required' }),
      };
    }

    if (!numPackets || numPackets <= 0 || Number.isNaN(numPackets)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'numPackets must be a positive integer',
        }),
      };
    }

    if (
      !packetWeightLb ||
      packetWeightLb <= 0 ||
      Number.isNaN(packetWeightLb)
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'packetWeightLb must be a positive number',
        }),
      };
    }

    // Create DB connection
    connection = createShippingDbConnection();

    // Generate shipping token
    const shippingToken = uuidv4();

    // Insert into shipments table
    const insertSql = `
      INSERT INTO shipments (
        order_id,
        business_id,
        shipping_token,
        shipment_address,
        num_packets,
        packet_weight_lb,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      orderId,
      businessId,
      shippingToken,
      shipmentAddress,
      numPackets,
      packetWeightLb,
      'INITIATED',
    ];

    const insertRes = await connection.query(insertSql, params);
    const shipmentId =
      insertRes && insertRes.insertId ? insertRes.insertId : null;

    const responseBody = {
      shippingToken,
      shipmentId,
      orderId,
      businessId,
      shipmentAddress,
      numPackets,
      packetWeightLb,
    };

    // ---------- SNS PUBLISH (NEW) ----------
    try {
      await publishShipmentNotification(responseBody);
    } catch (snsErr) {
      console.error('Failed to publish SNS notification:', snsErr);
      // Do NOT throw; shipping should still succeed even if SNS fails
    }

    // Return the token for caller / debugging
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
  } catch (err) {
    console.error('Shipping Lambda error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Shipping processing failed',
        details: err && err.message ? err.message : String(err),
      }),
    };
  } finally {
    if (connection) {
      try {
        connection.end();
      } catch (closeErr) {
        console.error('Error closing shipping DB connection:', closeErr);
      }
    }
  }
};
