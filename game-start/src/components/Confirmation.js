import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const order =
    location.state?.order || JSON.parse(localStorage.getItem("orderData")) || {};
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
  const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo")) || {};

  const confirmationNumber = Math.random().toString(36).substring(2, 7).toUpperCase();

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const deliveryDateStr = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="confirmation-container">
      <h2>Order Confirmed!</h2>
      <p>
        <strong>Order Number:</strong> {confirmationNumber}
      </p>
      <p>
        <strong>Estimated Delivery:</strong> {deliveryDateStr}
      </p>

      <h3>Shipping Information</h3>
      <p>
        {shippingInfo.fullName} <br />
        {shippingInfo.address} <br />
        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
      </p>

      <h3>Payment Method</h3>
      <p>
        Cardholder: {paymentInfo.cardholderName || "N/A"} <br />
        Card Ending: {paymentInfo.cardNumber?.slice(-4) || "XXXX"} <br />
        Expiry: {paymentInfo.expiry || "MM/YY"}
      </p>

      <h3>Order Summary</h3>
      {order.items && order.items.length > 0 ? (
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              {item.name} × {item.quantity} — $
              {(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found in your order.</p>
      )}

      <h3>Total Amount Paid: ${order.total ? order.total.toFixed(2) : "0.00"}</h3>

      <button onClick={() => navigate("/purchase")}>Back to Shopping</button>
    </div>
  );
};

export default Confirmation;
