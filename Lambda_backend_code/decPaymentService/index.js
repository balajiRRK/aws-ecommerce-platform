const mysql = require('mysql');
const util = require('util');
let uuidv4;

const setupUUIDV4 = async () => {
  const { v4 } = await import('uuid');
  uuidv4 = v4;
};

// Create and return a new connection for each invocation to avoid packet order
// issues when running in Lambda (do not reuse a global connection across invocations).
const createPaymentDbConnection = () => {
  const conn = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
  });
  conn.query = util.promisify(conn.query).bind(conn);
  return conn;
};

// Helper function to validate payment info
const validatePaymentInfo = ({ holderName, cardNum, expDate, cvv }) => {
  if (!holderName || holderName.trim() === '') {
    return 'Cardholder name is required';
  }

  // Safely normalize card number: remove all non-digits
  const cardNumberDigits = (cardNum || '').toString().replace(/\D/g, '');
  if (!/^\d{13,19}$/.test(cardNumberDigits)) {
    return 'Card number must be 13–19 digits';
  }

  if (!/^\d{2}\/\d{2}$/.test(expDate || '')) {
    return 'Expiration date must be in MM/YY format';
  }

  // Check if expiration date is not in the past
  const [month, year] = expDate.split('/').map(Number);
  if (month < 1 || month > 12) return 'Expiration month must be between 01 and 12';

  const currentDate = new Date();
  const expYear = 2000 + year;
  const lastDayOfMonth = new Date(expYear, month, 0); // last day of that month
  if (lastDayOfMonth < currentDate) {
    return 'Card is expired';
  }

  // Normalize CVV as digits
  const cvvDigits = (cvv || '').toString().replace(/\D/g, '');
  if (!/^\d{3,4}$/.test(cvvDigits)) {
    return 'CVV must be 3 or 4 digits';
  }

  return null;
};

exports.handler = async (event) => {
  let connection;
  try {
    if (!uuidv4) {
      await setupUUIDV4();
    }

    // Defensive parsing: API Gateway / Lambda invoke shapes may differ.
    console.log('payment handler received event.body type:', typeof event.body);
    let data;
    try {
      if (typeof event.body === 'string') {
        data = JSON.parse(event.body);
      } else if (event.body && typeof event.body === 'object') {
        data = event.body;
      } else if (event && event.holderName) {
        // invoked directly with a payload instead of proxy event
        data = event;
      } else {
        // last resort: try to parse event as a string
        data = event.body ? JSON.parse(String(event.body)) : {};
      }
    } catch (parseErr) {
      console.error('Failed to parse event.body in payment handler:', {
        body: event.body,
        error: parseErr && parseErr.message,
      });
      throw new Error(`Invalid payment payload: ${parseErr && parseErr.message}`);
    }

    // Accept multiple input shapes coming from different callers (frontend or order-processing service)
    const holderName =
      data.holderName ||
      data.card_holder_name ||
      data.cardholderName ||
      data.card_holder;
    const cardNum =
      data.cardNum ||
      data.card_number ||
      data.cardNumber;
    const expDate =
      data.expDate ||
      data.expir_date ||
      data.expiry;
    const cvv =
      data.cvv ||
      data.cvvCode;

    // Masked debug log so we can see what actually arrived without leaking secrets
    const safeDigits = (cardNum || '').toString().replace(/\D/g, '');
    console.log('Payment service received card (masked):', {
      len: safeDigits.length,
      last4: safeDigits.slice(-4),
      hasHolderName: !!holderName,
      expDate,
      cvvLen: (cvv || '').toString().length,
    });

    // Validate payment info
    const validationError = validatePaymentInfo({ holderName, cardNum, expDate, cvv });
    if (validationError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: validationError }),
      };
    }

    // create a fresh connection for this invocation
    connection = createPaymentDbConnection();
    const insertRes = await connection.query(
      'INSERT INTO PAYMENT_INFO (HOLDER_NAME, CARD_NUM, EXP_DATE, CVV, CREATED_AT) VALUES (?, ?, ?, ?, NOW())',
      [holderName, cardNum, expDate, cvv]
    );

    const paymentInfoId = insertRes && insertRes.insertId ? insertRes.insertId : null;

    // Generate a confirmation token
    const confirmationToken = uuidv4();

    return {
      statusCode: 200,
      body: JSON.stringify({ confirmationToken, paymentInfoId }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Payment processing failed',
        details: err && err.message ? err.message : String(err),
      }),
    };
  } finally {
    if (connection) {
      try {
        connection.end();
      } catch (closeErr) {
        console.error('Error closing payment DB connection:', closeErr);
      }
    }
  }
};
