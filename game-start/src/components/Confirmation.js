import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function Confirmation() {
  const navigate = useNavigate();
  const { cartState, getTotalPrice, clearCart } = useCart();

  // Generate random order number only once
  const [orderNumber] = useState(() => Math.random().toString(36).substring(7).toUpperCase());

  // Calculate estimated delivery date (current date + 7 days)
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);
  const deliveryDateString = estimatedDelivery.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Store cart items before clearing (for display)
  const orderedItems = [...cartState.items];
  const totalPrice = getTotalPrice();

  // Clear cart when page loads (order is complete)
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const handleContinueShopping = () => {
    navigate('/purchase');
  };

  return (
    <div>
      <h1>Order Confirmed!</h1>
      <h2>Thank you for your order!</h2>

      <div>
        <p>
          <strong>Order Number:</strong> {orderNumber}
        </p>
        <p>
          <strong>Estimated Delivery:</strong> {deliveryDateString}
        </p>
      </div>

      <div>
        <h2>Order Summary</h2>
        {orderedItems.length === 0 ? (
          <p>No items in order</p>
        ) : (
          <div>
            {orderedItems.map((item) => (
              <div key={item.id}>
                <p>
                  <strong>{item.name}</strong>
                  <br />
                  Quantity: {item.quantity}
                  <br />
                  Price: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3>Total Amount Paid: ${totalPrice.toFixed(2)}</h3>
      </div>

      <div>
        <button onClick={handleContinueShopping}>Continue Shopping</button>
      </div>
    </div>
  );
}

export default Confirmation;