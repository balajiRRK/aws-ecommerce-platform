import React from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const PaymentEntry = () => {
  let title = "Game-Start Payment Entry Page";
  const location = useLocation();
  const { cartState, getTotalPrice } = useCart();

  return (
    <div className="payment-container">
      <h1>{title}</h1>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartState.items.length === 0 ? (
          <p>No items in cart. Please go back and add items.</p>
        ) : (
          <>
            {cartState.items.map((item) => (
              <div key={item.id} className="order-item">
                <span>{item.name}</span>
                <span> Qty: {item.quantity}</span>
                <span> ${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total">
              <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
            </div>
          </>
        )}
      </div>

      <p>Payment entry form will go here.</p>
    </div>
  );
};

export default PaymentEntry;
