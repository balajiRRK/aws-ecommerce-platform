import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function ShippingEntry() {
  const navigate = useNavigate();
  const { cartState, getTotalPrice } = useCart();

  const [shippingData, setShippingData] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingData({
      ...shippingData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!shippingData.addressLine1 || !shippingData.city || 
        !shippingData.state || !shippingData.zip) {
      alert('Please fill in all required fields');
      return;
    }

    // Navigate to view order page with shipping data
    navigate('/purchase/viewOrder', { state: { shippingData } });
  };

  return (
    <div>
      <h1>Game-Start Shipping Entry Page</h1>
      
      <div>
        <h2>Order Summary</h2>
        {cartState.items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartState.items.map((item) => (
              <div key={item.id}>
                <p>
                  {item.name} - Quantity: {item.quantity} - 
                  Price: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
          </div>
        )}
      </div>

      <div>
        <h2>Shipping Information</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Address Line 1 (required):
              <input
                type="text"
                name="addressLine1"
                value={shippingData.addressLine1}
                onChange={handleChange}
                placeholder="123 Main Street"
                required
              />
            </label>
          </div>

          <div>
            <label>
              Address Line 2 (optional):
              <input
                type="text"
                name="addressLine2"
                value={shippingData.addressLine2}
                onChange={handleChange}
                placeholder="Apt 4B"
              />
            </label>
          </div>

          <div>
            <label>
              City (required):
              <input
                type="text"
                name="city"
                value={shippingData.city}
                onChange={handleChange}
                placeholder="New York"
                required
              />
            </label>
          </div>

          <div>
            <label>
              State (required):
              <input
                type="text"
                name="state"
                value={shippingData.state}
                onChange={handleChange}
                placeholder="NY"
                required
              />
            </label>
          </div>

          <div>
            <label>
              ZIP Code (required):
              <input
                type="text"
                name="zip"
                value={shippingData.zip}
                onChange={handleChange}
                placeholder="10001"
                required
              />
            </label>
          </div>

          <button type="submit">Continue to Review Order</button>
        </form>
      </div>
    </div>
  );
}

export default ShippingEntry;