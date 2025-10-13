import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function PaymentEntry() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalPrice } = useCart();
  const shippingData = location.state?.shippingData;

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !paymentData.cardNumber ||
      !paymentData.nameOnCard ||
      !paymentData.expiry ||
      !paymentData.cvv
    ) {
      alert("Please fill in all payment fields");
      return;
    }

    navigate("/purchase/confirmation", { state: { shippingData } });
  };

  return (
    <div>
      <h1>Game-Start Payment Entry Page</h1>

      <h2>Order Total: ${getTotalPrice().toFixed(2)}</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Card Number:
          <input
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Name on Card:
          <input
            name="nameOnCard"
            value={paymentData.nameOnCard}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Expiry Date (MM/YY):
          <input
            name="expiry"
            value={paymentData.expiry}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          CVV:
          <input
            name="cvv"
            value={paymentData.cvv}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Pay and Confirm Order</button>
      </form>
    </div>
  );
}

export default PaymentEntry;
