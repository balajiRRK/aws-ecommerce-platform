import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevOrder =
    location.state?.order || JSON.parse(localStorage.getItem("orderData")) || {};

  const [paymentInfo, setPaymentInfo] = useState({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !paymentInfo.cardholderName ||
      !paymentInfo.cardNumber ||
      !paymentInfo.expiry ||
      !paymentInfo.cvv
    ) {
      alert("Please fill in all payment fields");
      return;
    }

    localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
    navigate("/purchase/shippingEntry", { state: { order: prevOrder } });
  };

  return (
    <div className="form-container">
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cardholder Name</label>
          <input
            type="text"
            name="cardholderName"
            value={paymentInfo.cardholderName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handleChange}
            placeholder="1111 2222 3333 4444"
            required
          />
        </div>

        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="text"
            name="expiry"
            value={paymentInfo.expiry}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </div>

        <div className="form-group">
          <label>CVV</label>
          <input
            type="password"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handleChange}
            placeholder="123"
            required
          />
        </div>

        <button type="submit">Continue to Shipping</button>
      </form>
    </div>
  );
};

export default PaymentEntry;
