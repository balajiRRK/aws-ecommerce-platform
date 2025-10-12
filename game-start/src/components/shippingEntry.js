import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShippingEntry = ({ order, setOrder }) => {
  const navigate = useNavigate();
  const [shipping, setShipping] = useState(order.shipping_address || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = { ...order, shipping_address: shipping };
    setOrder(newOrder);
    navigate("/purchase/viewOrder");
  };

  return (
    <div className="shipping-container">
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit} className="shipping-form">
        <label>
          Address Line 1:
          <input
            type="text"
            name="address_1"
            value={shipping.address_1}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address Line 2:
          <input
            type="text"
            name="address_2"
            value={shipping.address_2}
            onChange={handleChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={shipping.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={shipping.state}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          ZIP Code:
          <input
            type="text"
            name="zip"
            value={shipping.zip}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Next: Review Order</button>
      </form>
    </div>
  );
};

export default ShippingEntry;
