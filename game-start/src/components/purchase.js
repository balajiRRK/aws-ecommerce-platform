import React from "react";
import { useNavigate } from "react-router-dom";

const Purchase = ({ order, setOrder }) => {
  const navigate = useNavigate();
  let title = "Game-Start Purchase Page";

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/purchase/paymentEntry");
  };

  const products = [
    "Legend of Zelda: Breath of The Wild",
    "Just Dance 88",
    "Madden 2054",
    "NBA 2K54",
    "Flappy Bird",
  ];

  return (
    <div className="purchase-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} className="purchase-form">
        {products.map((product, idx) => (
          <div className="form-group" key={product}>
            <label htmlFor={`product-${idx}`}>{product}</label>
            <input
              id={`product-${idx}`}
              type="number"
              required
              min="0"
              value={order.buyQuantity[idx] || ""}
              data-testid={`product-input-${idx}`}
              onChange={(e) => {
                const newOrder = { ...order };
                newOrder.buyQuantity[idx] = Number(e.target.value);
                setOrder(newOrder);
              }}
            />
          </div>
        ))}
        <button className="button" type="submit">
          Pay
        </button>
      </form>
    </div>
  );
};

export default Purchase;
