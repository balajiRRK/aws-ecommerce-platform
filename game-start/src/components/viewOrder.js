import React from "react";
import { useNavigate } from "react-router-dom";

const ViewOrder = ({ order, setOrder }) => {
  const navigate = useNavigate();

  const products = [
    { name: "Legend of Zelda: Breath of The Wild", price: 60 },
    { name: "Just Dance 88", price: 40 },
    { name: "Madden 2054", price: 55 },
    { name: "NBA 2K54", price: 50 },
    { name: "Flappy Bird", price: 10 },
  ];

  const total = order.buyQuantity.reduce(
    (sum, qty, i) => sum + qty * products[i].price,
    0
  );

  const handleConfirm = () => {
    const newOrder = { ...order, totalCost: total };
    setOrder(newOrder);
    navigate("/purchase/confirmation");
  };

  return (
    <div className="view-order-container">
      <h2>Review Your Order</h2>
      <table className="order-summary">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) =>
            order.buyQuantity[i] > 0 ? (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td>{order.buyQuantity[i]}</td>
                <td>${p.price}</td>
                <td>${order.buyQuantity[i] * p.price}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      <h3>Total: ${total}</h3>
      <button onClick={handleConfirm}>Confirm Order</button>
    </div>
  );
};

export default ViewOrder;
