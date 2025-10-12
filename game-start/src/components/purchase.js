import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatePayload } from "../StatePayload";

const Purchase = () => {
  const [order, setOrder] = useState(StatePayload);
  const navigate = useNavigate();
  const title = "Game-Start Purchase Page";

  const products = [
    { name: "Legend of Zelda: Breath of The Wild", price: 60 },
    { name: "Just Dance 88", price: 40 },
    { name: "Madden 2054", price: 55 },
    { name: "NBA 2K54", price: 50 },
    { name: "Flappy Bird", price: 10 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = { ...order };
    navigate("/purchase/paymentEntry", { state: { order: newOrder } });
  };

  return (
    <div className="purchase-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} className="purchase-form">
        {products.map((product, idx) => (
          <div className="form-group" key={product.name}>
            <label htmlFor={`product-${idx}`}>{product.name}</label>
            <input
              id={`product-${idx}`}
              type="number"
              required
              min="0"
              value={order.buyQuantity[idx] || ""}
              onChange={(e) => {
                const newOrder = { ...order };
                newOrder.buyQuantity[idx] = Number(e.target.value);
                setOrder(newOrder);
              }}
            />
          </div>
        ))}
        <button type="submit">Next: Payment Info</button>
      </form>
    </div>
  );
};

export default Purchase;
