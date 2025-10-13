import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ViewOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const order =
    location.state?.order || JSON.parse(localStorage.getItem("orderData")) || {};
  const shippingInfo =
    JSON.parse(localStorage.getItem("shippingInfo")) || {};
  const paymentInfo =
    JSON.parse(localStorage.getItem("paymentInfo")) || {};

  const handleConfirm = () => {
    // save confirmation flag or similar if needed
    navigate("/purchase/viewConfirmation", { state: { order } });
  };

  return (
    <div className="form-container">
      <h2>Review Your Order</h2>

      <h3>Items:</h3>
      <ul>
        {order.items?.map((item, idx) => (
          <li key={idx}>
            {item.name} × {item.quantity} — $
            {(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>

      <h3>Payment Info:</h3>
      <p>Cardholder: {paymentInfo.cardholderName || "N/A"}</p>
      <p>Card: **** **** **** {paymentInfo.cardNumber?.slice(-4) || "N/A"}</p>

      <h3>Shipping Info:</h3>
      <p>{shippingInfo.fullName}</p>
      <p>{shippingInfo.address1}</p>
      {shippingInfo.address2 && <p>{shippingInfo.address2}</p>}
      <p>
        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
      </p>

      <h3>Total: ${order.total?.toFixed(2) || "0.00"}</h3>

      <button onClick={handleConfirm}>Confirm Order</button>
    </div>
  );
};

export default ViewOrder;
