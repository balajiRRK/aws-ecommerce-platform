import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatePayload } from "../StatePayload";

const Purchase = () => {
  const [order, setOrder] = useState(StatePayload);
  const navigate = useNavigate(); //This is our hook for React
  let title = "Game-Start Purchase Page";

  //This action handler is used to route to our next page
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/purchase/paymentEntry", { order: order, setOrder: setOrder });
  };

  console.log("order: ", order);

  // Example product names, replace with order.products if available
  // This is just hard coded right now, we'd eventually want it to populate with the data from the backend
  const products = ["Legend of Zelda: Breath of The Wild", "Just Dance 88", "Madden 2054", "NBA 2K54", "Flappy Bird"];

  return (
    <div className="purchase-container">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} className="purchase-form">
        {products.map((product, idx) => (
          <div className="form-group" key={product}>
            <label htmlFor={`product-${idx}`}>   {product}</label>
            <input
              id={`product-${idx}`}
              type="number"
              required
              min="0"
              value={order.buyQuantity[idx] || ""}
              data-testid={`product-input-${idx}`}
              onChange={(e) => {
                const newOrder = { ...order };
                newOrder.buyQuantity[idx] = e.target.value;
                setOrder(newOrder);
              }}
            />
          </div>
        ))}
        <button className="button" type="submit">Pay</button>
      </form>
    </div>
  );
};

export default Purchase;
