import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentEntry = ({ order, setOrder }) => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState(order.credit_card_data || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = { ...order, credit_card_data: payment };
    setOrder(newOrder);
    navigate("/purchase/shippingEntry");
  };

  return (
    <div className="payment-container">
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <label>
          Card Number:
          <input
            type="text"
            name="card_number"
            value={payment.card_number}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Expiration Date:
          <input
            type="text"
            name="expir_date"
            placeholder="MM/YY"
            value={payment.expir_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          CVV Code:
          <input
            type="text"
            name="cvvCode"
            value={payment.cvvCode}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Next: Shipping Info</button>
      </form>
    </div>
  );
};

export default PaymentEntry;
