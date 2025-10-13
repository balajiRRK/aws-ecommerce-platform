import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatePayload } from "../StatePayload";

const Purchase = () => {
  const [order, setOrder] = useState(StatePayload);
  const navigate = useNavigate();

  const products = [
    { name: "Legend of Zelda: Breath of The Wild", price: 59.99 },
    { name: "Just Dance 88", price: 49.99 },
    { name: "Madden 2054", price: 69.99 },
    { name: "NBA 2K54", price: 69.99 },
    { name: "Flappy Bird", price: 4.99 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const items = products
      .map((product, idx) => ({
        name: product.name,
        price: product.price,
        quantity: parseInt(order.buyQuantity[idx]) || 0,
      }))
      .filter((item) => item.quantity > 0);

    if (items.length === 0) {
      alert("Please select at least one item before proceeding.");
      return;
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const updatedOrder = { ...order, items, total };
    setOrder(updatedOrder);
    localStorage.setItem("orderData", JSON.stringify(updatedOrder));

    // ✅ Go to shipping first
    navigate("/purchase/shippingEntry", { state: { order: updatedOrder } });
  };

  const handleChange = (index, value) => {
    const newOrder = { ...order };
    newOrder.buyQuantity[index] = value;
    setOrder(newOrder);
  };

  return (
    <div className="purchase-container">
      <h2>Game-Start Purchase Page</h2>
      <form onSubmit={handleSubmit} className="purchase-form">
        {products.map((product, idx) => (
          <div className="form-group" key={idx}>
            <label htmlFor={`product-${idx}`}>
              {product.name} — ${product.price.toFixed(2)}
            </label>
            <input
              id={`product-${idx}`}
              type="number"
              min="0"
              value={order.buyQuantity[idx] || ""}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          </div>
        ))}
        <button className="button" type="submit">
          Next: Shipping Info
        </button>
      </form>
    </div>
  );
};

export default Purchase;
