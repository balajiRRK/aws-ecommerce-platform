import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartState, getTotalPrice, clearCart } = useCart();

  const shippingData = location.state?.shippingData;
  const [orderNumber] = useState(() => Math.random().toString(36).substring(7).toUpperCase());

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div>
      <h1>Order Confirmed!</h1>
      <p><strong>Order Number:</strong> {orderNumber}</p>
      <p>
        <strong>Estimated Delivery:</strong>{" "}
        {estimatedDelivery.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <h2>Order Summary</h2>
      {cartState.items.map((item) => (
        <div key={item.id}>
          {item.name} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
        </div>
      ))}

      <h3>Total Amount Paid: ${getTotalPrice().toFixed(2)}</h3>

      {shippingData && (
        <>
          <h2>Shipping To:</h2>
          <p>
            {shippingData.addressLine1}
            <br />
            {shippingData.addressLine2 && <>{shippingData.addressLine2}<br /></>}
            {shippingData.city}, {shippingData.state} {shippingData.zip}
          </p>
        </>
      )}

      <button onClick={() => navigate("/purchase")}>Continue Shopping</button>
    </div>
  );
}

export default Confirmation;
