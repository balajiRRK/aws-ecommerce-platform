import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ShippingEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const prevOrder = location.state?.order || JSON.parse(localStorage.getItem("orderData")) || { buyQuantity: [0, 0, 0, 0, 0] };
  const [shipping, setShipping] = useState(prevOrder.shipping_address || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productList = [
      { name: "Legend of Zelda: Breath of The Wild", price: 60 },
      { name: "Just Dance 88", price: 40 },
      { name: "Madden 2054", price: 55 },
      { name: "NBA 2K54", price: 50 },
      { name: "Flappy Bird", price: 10 },
    ];

    const items = productList
      .map((p, i) => ({ ...p, quantity: Number(prevOrder.buyQuantity[i] || 0) }))
      .filter((item) => item.quantity > 0);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = { ...prevOrder, shipping_address: shipping, items, total };

    localStorage.setItem("orderData", JSON.stringify(newOrder));
    navigate("/purchase/viewOrder", { state: { order: newOrder } });
  };

  return (
    <div className="shipping-container">
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Address Line 1:
          <input type="text" name="address_1" value={shipping.address_1 || ""} onChange={handleChange} required />
        </label>
        <label>
          Address Line 2:
          <input type="text" name="address_2" value={shipping.address_2 || ""} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={shipping.city || ""} onChange={handleChange} required />
        </label>
        <label>
          State:
          <input type="text" name="state" value={shipping.state || ""} onChange={handleChange} required />
        </label>
        <label>
          ZIP Code:
          <input type="text" name="zip" value={shipping.zip || ""} onChange={handleChange} required />
        </label>
        <button type="submit">Next: Review Order</button>
      </form>
    </div>
  );
};

export default ShippingEntry;
