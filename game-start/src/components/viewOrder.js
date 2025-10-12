import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function ViewOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartState, getTotalPrice, getTotalItems } = useCart();

  // Get shipping data passed from previous page
  const shippingData = location.state?.shippingData;

  // Handle case where user navigated directly without shipping data
  if (!shippingData) {
    return (
      <div>
        <h1>Game-Start View Order Page</h1>
        <p>No shipping information found. Please complete the shipping form.</p>
        <button onClick={() => navigate('/purchase/shippingEntry')}>
          Go to Shipping Entry
        </button>
      </div>
    );
  }

  const handleBackToShipping = () => {
    navigate('/purchase/shippingEntry');
  };

  const handleConfirmOrder = () => {
    navigate('/purchase/confirmation', { 
      state: { shippingData } 
    });
  };

  return (
    <div>
      <h1>Game-Start View Order Page</h1>

      <div>
        <h2>Order Items</h2>
        {cartState.items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartState.items.map((item) => (
              <div key={item.id}>
                <p>
                  <strong>{item.name}</strong>
                  <br />
                  Quantity: {item.quantity}
                  <br />
                  Price per item: ${item.price.toFixed(2)}
                  <br />
                  Line Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2>Shipping Address</h2>
        <p>
          {shippingData.addressLine1}
          <br />
          {shippingData.addressLine2 && (
            <>
              {shippingData.addressLine2}
              <br />
            </>
          )}
          {shippingData.city}, {shippingData.state} {shippingData.zip}
        </p>
      </div>

      <div>
        <h2>Order Total</h2>
        <p>
          <strong>Total Items:</strong> {getTotalItems()}
        </p>
        <p>
          <strong>Total Price:</strong> ${getTotalPrice().toFixed(2)}
        </p>
      </div>

      <div>
        <button onClick={handleBackToShipping}>Back to Shipping</button>
        <button onClick={handleConfirmOrder}>Confirm Order</button>
      </div>
    </div>
  );
}

export default ViewOrder;