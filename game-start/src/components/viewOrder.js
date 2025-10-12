import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ViewOrder() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order || JSON.parse(localStorage.getItem("orderData")) || { items: [], total: 0 };

  const handleConfirm = () => {
    localStorage.setItem("orderData", JSON.stringify(order));
    navigate("/purchase/confirmation", { state: { order } });
  };

  return (
    <div className="view-order-container">
      <h2>Order Summary</h2>
      {order.items.length === 0 ? (
        <p>No items in order.</p>
      ) : (
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              {item.name} × {item.quantity} — ${item.price * item.quantity}
            </li>
          ))}
        </ul>
      )}
      <h3>Total Amount: ${order.total}</h3>
      <button onClick={handleConfirm}>Confirm Order</button>
    </div>
  );
}

export default ViewOrder;
