const mysql = require('mysql');
const util = require('util');
const axios = require('axios');
const { EventBridgeClient, PutEventsCommand } = require("@aws-sdk/client-eventbridge");

// EventBridge client (AWS SDK v3, supported in Node 18/20/22)
const eventBridgeClient = new EventBridgeClient({});

// ---------- Helpers: HTTP + DB + routing ----------

const createDbConnection = async () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME
  });
  connection.query = util.promisify(connection.query).bind(connection);
  return connection;
};

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  },
  body: JSON.stringify(body)
});

const parsePathParts = (path) => {
  const parts = path.replace(/^\/|\/$/g, '').split('/');
  if (['dev', 'prod', 'v1', 'staging'].includes(parts[0])) {
    parts.shift();
  }
  return parts;
};

const normalizeItem = (item) => ({
  id: item.ID,
  name: item.NAME,
  description: item.DESCRIPTION,
  genre: item.GENRE,
  platform: item.PLATFORM,
  quantity: item.AVAILABLE_QUANTITY,
  price: item.UNIT_PRICE
});

const routeKey = (method, path, parts) => {
  const isGetInventoryEndpoint =
    method === 'GET' && path === '/inventory-management/inventory';
  const isGetInventoryItemsEndpoint =
    method === 'GET' &&
    parts.length >= 3 &&
    parts[0] === 'inventory-management' &&
    parts[1] === 'inventory' &&
    parts[2] === 'items';
  const isPutUpdateQuantityEndpoint =
    method === 'PUT' &&
    parts.length === 4 &&
    parts[0] === 'inventory-management' &&
    parts[1] === 'inventory' &&
    parts[2] === 'items';
  const isPostInventoryCheckEndpoint =
    method === 'POST' &&
    parts[0] === 'order-processing' &&
    parts[1] === 'order';

  if (isGetInventoryEndpoint) return 'GET_INVENTORY';
  if (isGetInventoryItemsEndpoint) return 'GET_ITEMS';
  if (isPutUpdateQuantityEndpoint) return 'PUT_UPDATE';
  if (isPostInventoryCheckEndpoint) return 'POST_CHECK';
  return 'NOT_FOUND';
};

// ---------- DB helpers ----------

const insertShippingInfo = async (conn, data) => {
  const sql = `
    INSERT INTO SHIPPING_INFO (ADDRESS1, ADDRESS2, CITY, STATE, COUNTRY, POSTAL_CODE)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const result = await conn.query(sql, [
    data.address_1,
    data.address_2,
    data.city,
    data.state,
    data.country,
    data.zip
  ]);
  return result.insertId;
};

const insertCustomerOrder = async (conn, data) => {
  const sql = `
    INSERT INTO CUSTOMER_ORDER
      (CUSTOMER_NAME, CUSTOMER_EMAIL, SHIPPING_INFO_ID_FK, PAYMENT_INFO_ID_FK, STATUS, DELIVERY_DATE, PAYMENT_CONFIRMATION_TOKEN)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const status = data.status || 'New';
  const paymentInfoId = data.paymentInfoId || null;
  const paymentToken = data.paymentConfirmationToken || null;
  const result = await conn.query(sql, [
    data.customerName,
    data.customerEmail,
    data.shippingInfoId,
    paymentInfoId,
    status,
    data.deliveryDate,
    paymentToken
  ]);
  return result.insertId;
};

const batchInsertOrderLineItems = async (conn, orderId, lineItems) => {
  if (lineItems.length === 0) return 0;

  const values = lineItems.map(item => [
    item.itemId,
    item.itemName,
    item.genre,
    item.platform,
    item.quantity,
    orderId
  ]);

  const sql = `
    INSERT INTO CUSTOMER_ORDER_LINE_ITEM
      (ITEM_ID, ITEM_NAME, GENRE, PLATFORM, QUANTITY, CUSTOMER_ORDER_ID_FK)
    VALUES ?
  `;
  const result = await conn.query(sql, [values]);
  return result.affectedRows;
};

// ---------- Payment + EventBridge helpers ----------

const callPaymentServiceWithRetry = async (url, payload) => {
  const maxAttempts = parseInt(process.env.PAYMENT_MAX_ATTEMPTS, 10) || 3;
  const defaultTimeoutMs = parseInt(process.env.PAYMENT_TIMEOUT_MS, 10) || 30000;
  const fixedDelayMs = 1000;

  let lastErr = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const attemptTimeout = defaultTimeoutMs;
    console.log(`Calling payment service (attempt ${attempt}/${maxAttempts}) to ${url}`);
    const start = Date.now();
    try {
      const resp = await axios.post(url, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: attemptTimeout
      });
      const duration = Date.now() - start;
      console.log(`Payment service responded in ${duration}ms on attempt ${attempt}`);
      return resp;
    } catch (err) {
      lastErr = err;
      console.error(`Payment attempt ${attempt} failed:`, {
        code: err && err.code,
        message: err && err.message,
        status: err && err.response && err.response.status
      });
      if (attempt < maxAttempts) {
        console.log(`Waiting ${fixedDelayMs}ms before next attempt`);
        await new Promise(r => setTimeout(r, fixedDelayMs));
      }
    }
  }
  throw lastErr;
};

const publishShippingEvent = async ({ orderId, orderNumber, order, shipping, deliveryDate, confirmationToken }) => {
  if (!order || !shipping) {
    console.warn("Missing order or shipping info, skipping shipping event");
    return;
  }

  const items = order.items || [];
  const numPackets = items.length;
  const totalQuantity = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
  const weightPerPacket = numPackets > 0 ? totalQuantity / numPackets : 0;

  const detail = {
    businessId: process.env.BUSINESS_ID || "GAMESTART-12345",
    orderId,
    orderNumber,
    customerEmail: order.customerEmail,
    shippingAddress: {
      address1: shipping.address_1,
      address2: shipping.address_2,
      city: shipping.city,
      state: shipping.state,
      country: shipping.country,
      zip: shipping.zip,
    },
    numPackets,
    weightPerPacket,
    estimatedDelivery: deliveryDate,
    confirmationToken,
  };

  const params = {
    Entries: [
      {
        Source: "dec.order-service",
        DetailType: "OrderCreated",
        Detail: JSON.stringify(detail),
        EventBusName: process.env.EVENT_BUS_NAME || "default",
      },
    ],
  };

  console.log("Publishing shipping event to EventBridge with detail:", JSON.stringify(detail, null, 2));
  const cmd = new PutEventsCommand(params);
  const result = await eventBridgeClient.send(cmd);
  console.log("Shipping event publish result:", JSON.stringify(result, null, 2));
};

// ---------- Core order flow ----------

const createOrderAndProcessPayment = async (conn, orderData, dbItems, availableItems) => {
  const { order, items, shipping, payment } = orderData;
  const dbItemMap = dbItems.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});

  // Delivery date = today + 3 days
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const deliveryDateStr = deliveryDate.toISOString().split('T')[0];

  // Build payment service URL
  let paymentServiceUrl = process.env.PAYMENT_SERVICE_URL;
  try {
    const tmp = new URL(paymentServiceUrl);
    if (!/\/payment(\/|$)/i.test(tmp.pathname)) {
      tmp.pathname = tmp.pathname.replace(/\/$/, '') + '/payment';
      paymentServiceUrl = tmp.toString();
    }
  } catch (urlErr) {
    if (!/\/payment(\/|$)/i.test(paymentServiceUrl)) {
      paymentServiceUrl = paymentServiceUrl.replace(/\/$/, '') + '/payment';
    }
  }

  // 🔧 Always source card data from order.credit_card_data first,
  // falling back to the `payment` object if needed.
  const credit = (order && order.credit_card_data) || payment || {};

  // Normalize payment payload for the payment service
  const paymentPayload = {
    holderName: credit.card_holder_name || credit.cardholderName || credit.holderName,
    cardNum:   credit.card_number      || credit.cardNumber      || credit.cardNum,
    expDate:   credit.expir_date       || credit.expiry          || credit.expDate,
    cvv:       credit.cvvCode          || credit.cvv
  };

  // Masked debug so we can see what we send out without leaking full card data
  const safeDigitsOut = (paymentPayload.cardNum || '').toString().replace(/\D/g, '');
  console.log('DEBUG paymentPayload to payment service (masked):', {
    len: safeDigitsOut.length,
    last4: safeDigitsOut.slice(-4),
  });

  // Call payment service (only fail if the call itself fails)
  let confirmationToken = null;
  try {
    const payResp = await callPaymentServiceWithRetry(paymentServiceUrl, paymentPayload);

    let payData = payResp.data ?? {};

    // If the payment service returned a string body, parse it
    if (typeof payData === 'string') {
      try {
        payData = JSON.parse(payData);
      } catch (parseErr) {
        console.error('Failed to parse payment response JSON string:', parseErr && parseErr.message, payData);
      }
    }

    // If it's Lambda-proxy-style { statusCode, body }, parse body
    if (payData && payData.statusCode && typeof payData.body === 'string') {
      try {
        payData = JSON.parse(payData.body);
      } catch (parseErr) {
        console.error('Failed to parse payment service nested body:', parseErr && parseErr.message, payData.body);
      }
    }

    confirmationToken = payData.confirmationToken || payData.token || null;

    // IMPORTANT: do NOT fail the order if token is missing, just log
    if (!confirmationToken) {
      console.error('Payment service did not return confirmation token; continuing without one', { payData });
    }
  } catch (payErr) {
    console.error('Error calling payment service after retries:', payErr);
    const details = (payErr && payErr.response)
      ? { status: payErr.response.status, data: payErr.response.data }
      : { message: payErr.message || String(payErr) };
    return jsonResponse(502, { success: false, error: 'Payment processing failed', details });
  }

  // Persist shipping info
  const shippingInfoId = await insertShippingInfo(conn, shipping);

  // Insert order header
  const orderId = await insertCustomerOrder(conn, {
    customerName: credit.card_holder_name || credit.cardholderName || 'Guest',
    customerEmail: order.customerEmail,
    shippingInfoId,
    paymentInfoId: null,
    status: 'New',
    deliveryDate: deliveryDateStr,
    paymentConfirmationToken: confirmationToken
  });

  // Insert line items
  const lineItems = items.map(i => ({
    itemId: i.id,
    itemName: dbItemMap[i.id].name,
    genre: dbItemMap[i.id].GENRE,
    platform: dbItemMap[i.id].PLATFORM,
    quantity: i.quantity,
  }));
  await batchInsertOrderLineItems(conn, orderId, lineItems);

  // Decrement inventory
  for (const i of items) {
    await conn.query(
      'UPDATE ITEM SET AVAILABLE_QUANTITY = AVAILABLE_QUANTITY - ? WHERE ID = ?',
      [i.quantity, i.id]
    );
  }

  const orderNumber = orderId.toString().padStart(5, '0');
  console.log("Order successfully confirmed and stored in database!");

  // Emit shipping event (best-effort)
  try {
    await publishShippingEvent({
      orderId,
      orderNumber,
      order,
      shipping,
      deliveryDate: deliveryDateStr,
      confirmationToken
    });
  } catch (evtErr) {
    console.error("Failed to publish shipping event:", evtErr);
  }

  // Final success response
  return jsonResponse(200, {
    success: true,
    available: true,
    message: 'All items available, order created successfully',
    orderId,
    orderNumber,
    estimatedDelivery: deliveryDateStr,
    items: availableItems,
    confirmationToken
  });
};

// ---------- Main Lambda handler ----------

const handler = async (event) => {
  let conn;

  try {
    console.log("Full event:", JSON.stringify(event, null, 2));

    conn = await createDbConnection();
    const method = event.httpMethod || 'GET';
    const path = event.path || '/';
    const query = event.queryStringParameters || {};

    const parts = parsePathParts(path);
    const matchedRoute = routeKey(method, path, parts);
    console.log('Matched Route Key:', matchedRoute);

    // Route handlers defined here to capture conn, event, query, etc.

    const handleGetInventory = async () => {
      const rawRows = await conn.query(
        'SELECT * FROM ITEM WHERE AVAILABLE_QUANTITY > 0'
      );
      const normalizedRows = rawRows.map(normalizeItem);
      return jsonResponse(200, {
        success: true,
        count: normalizedRows.length,
        data: normalizedRows
      });
    };

    const handleGetInventoryItems = async () => {
      if (query.name) {
        const search = `%${query.name.toLowerCase()}%`;
        const matching = await conn.query(
          'SELECT * FROM ITEM WHERE LOWER(name) LIKE ?',
          [search]
        );

        if (matching.length === 0) {
          return jsonResponse(404, {
            success: false,
            error: `No items found matching "${query.name}"`
          });
        }
        return jsonResponse(200, {
          success: true,
          count: matching.length,
          data: matching
        });
      }

      if (parts.length === 4) {
        const id = parseInt(parts[3], 10);
        if (Number.isNaN(id)) {
          return jsonResponse(400, {
            success: false,
            error: 'Invalid item id'
          });
        }

        const rows = await conn.query(
          'SELECT * FROM ITEM WHERE id = ?',
          [id]
        );
        const item = rows[0];

        if (!item) {
          return jsonResponse(404, {
            success: false,
            error: `Item with ID ${id} not found`
          });
        }
        return jsonResponse(200, { success: true, data: item });
      }

      return jsonResponse(400, {
        success: false,
        error: 'Provide a query parameter `name` or request an item by id'
      });
    };

    const handlePutUpdateQuantity = async () => {
      const id = parseInt(parts[3], 10);
      if (Number.isNaN(id)) {
        return jsonResponse(400, {
          success: false,
          error: 'Invalid item id'
        });
      }

      const body = event.body ? JSON.parse(event.body) : {};
      const newQuantity = body.quantity;
      if (
        newQuantity === undefined ||
        typeof newQuantity !== 'number' ||
        newQuantity < 0
      ) {
        return jsonResponse(400, {
          success: false,
          error: 'Valid quantity is required'
        });
      }

      const checkRows = await conn.query(
        'SELECT * FROM ITEM WHERE id = ?',
        [id]
      );
      if (checkRows.length === 0) {
        return jsonResponse(404, {
          success: false,
          error: `Item with ID ${id} not found`
        });
      }

      await conn.query(
        'UPDATE ITEM SET AVAILABLE_QUANTITY = ? WHERE id = ?',
        [newQuantity, id]
      );

      const updatedRows = await conn.query(
        'SELECT * FROM ITEM WHERE id = ?',
        [id]
      );
      const item = updatedRows[0];

      return jsonResponse(200, {
        success: true,
        message: 'Inventory updated successfully',
        data: item
      });
    };

    const handlePostInventoryCheck = async () => {
      console.log("RAW EVENT BODY:", event.body);
      const body = event.body ? JSON.parse(event.body) : {};
      const order = body.order;
      const items = order.items || [];
      const shipping = order.shipping_address || {};
      const payment = order.credit_card_data || {};
      const total = order.total || 0;
      const maskedPayment = { ...payment };
      maskedPayment.card_number = payment.card_number ? payment.card_number.slice(-4) : '****';
      maskedPayment.cvvCode = '***';
      console.log("Parsed order payload:", { items, shipping, maskedPayment, total });

      if (!items || !Array.isArray(items) || items.length === 0) {
        return jsonResponse(400, {
          success: false,
          error: 'Items array is required and cannot be empty'
        });
      }

      const itemIds = items.map((i) => i.id);
      const placeholders = itemIds.map(() => '?').join(',');
      const sql = `
        SELECT id, name, AVAILABLE_QUANTITY, GENRE, PLATFORM, UNIT_PRICE
        FROM ITEM
        WHERE id IN (${placeholders})
      `;
      const dbItems = await conn.query(sql, itemIds);
      const dbItemMap = dbItems.reduce((map, item) => ({ ...map, [item.id]: item }), {});

      const unavailableItems = [];
      const availableItems = [];
      for (const requestedItem of items) {
        const invItem = dbItemMap[requestedItem.id];
        const requestedQuantity = requestedItem.quantity || 0;
        if (!invItem || invItem.AVAILABLE_QUANTITY < requestedQuantity) {
          unavailableItems.push({
            id: requestedItem.id,
            name: invItem?.name,
            reason: invItem ? 'Insufficient quantity' : 'Item not found',
            requested: requestedQuantity,
            available: invItem?.AVAILABLE_QUANTITY || 0
          });
        } else {
          availableItems.push({
            id: invItem.id,
            name: invItem.name,
            requested: requestedQuantity,
            available: invItem.AVAILABLE_QUANTITY
          });
        }
      }

      if (unavailableItems.length > 0) {
        const errorMessage = unavailableItems.some(item => item.reason === 'Item not found')
          ? 'Certain items not found'
          : 'Certain items have insufficient stock';
        return jsonResponse(400, {
          success: false,
          error: errorMessage,
          unavailableItems,
          availableItems
        });
      }

      return await createOrderAndProcessPayment(
        conn,
        { order, items, shipping, payment },
        dbItems,
        availableItems
      );
    };

    // Dispatch route
    switch (matchedRoute) {
      case 'GET_INVENTORY':
        return await handleGetInventory();
      case 'GET_ITEMS':
        return await handleGetInventoryItems();
      case 'PUT_UPDATE':
        return await handlePutUpdateQuantity();
      case 'POST_CHECK':
        return await handlePostInventoryCheck();
      default:
        return jsonResponse(404, {
          success: false,
          error: 'Route not found',
          method,
          path,
          parts
        });
    }
  } catch (err) {
    console.error('Handler error:', err);
    return jsonResponse(500, {
      success: false,
      error: 'Server error',
      details: err.message
    });
  } finally {
    if (conn) {
      try {
        conn.end();
      } catch (closeErr) {
        console.error('Error while closing DB connection:', closeErr);
      }
      console.log('DB Connection closed.');
    }
  }
};

exports.handler = handler;



//Env variables within our lambda instance, shared here for reference:
// DB_HOST //
// DB_NAME decProject
// DB_USER decAdmin
// DB_USER_PASSWORD ************
// PAYMENT_SERVICE_URL https://v1lr26ebib.execute-api.us-east-2.amazonaws.com/dev