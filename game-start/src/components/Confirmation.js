import React from "react";
import { useLocation } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();

  // Get order from location state or fallback to localStorage
  const order = location.state?.order || JSON.parse(localStorage.getItem("orderData")) || { items: [], total: 0 };

  const confirmationNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="confirmation-container">
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase 🎉</p>
      <p><strong>Confirmation Number:</strong> {confirmationNumber}</p>

      <h3>Items Purchased:</h3>
      {order.items.length === 0 ? (
        <p>No items in order.</p>
      ) : (
        <ul>
          {order.items.map((item, idx) => (
            <li key={idx}>
              {item.name} × {item.quantity} — ${item.price * item.quantity}
            </li>
          ))}
        </ul>
      )}

      <h3>Total Paid: ${order.total}</h3>

      <h3>Shipping To:</h3>
      <p>
        {order.shipping_address?.address_1}<br />
        {order.shipping_address?.address_2 && (
          <>
            {order.shipping_address.address_2}
            <br />
          </>
        )}
        {order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.zip}
      </p>

      <h3>Payment Info:</h3>
      {order.credit_card_data?.card_number ? (
        <p>Card ending in ****{order.credit_card_data.card_number.slice(-4)}</p>
      ) : (
        <p>No payment info available</p>
      )}
    </div>
  );
};

export default Confirmation;
