import React from "react";

export default function ViewOrder() {
  return (
    <div className="view-order">
      <h2>Order Summary</h2>
      <p>Product: Example Item</p>
      <p>Quantity: 1</p>
      <p>Total: $49.99</p>
      <button onClick={() => window.location.href="/purchase/confirmation"}>
        Confirm Order
      </button>
    </div>
  );
}
