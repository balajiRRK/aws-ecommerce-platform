import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatePayload } from "../StatePayload";
import { useCart } from "../contexts/CartContext";

const Purchase = () => {
  const [order, setOrder] = useState(StatePayload);
  const navigate = useNavigate();
  const { addToCart, clearCart } = useCart();

  const products = [
    { id: 0, name: "Legend of Zelda: Breath of The Wild", price: 59.99 },
    { id: 1, name: "Just Dance 88", price: 49.99 },
    { id: 2, name: "Madden 2054", price: 69.99 },
    { id: 3, name: "NBA 2K54", price: 69.99 },
    { id: 4, name: "Flappy Bird", price: 4.99 },
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
    // Update cart context so ShoppingCart shows the chosen items
    try {
      // clear any existing cart content for this flow and add new selections
      clearCart();
      items.forEach((item) => {
        // find product price and id from products list (items currently include name/price/quantity)
        const prod = products.find((p) => p.name === item.name);
        addToCart({ id: prod?.id ?? item.id, name: item.name, price: item.price }, item.quantity);
      });
    } catch (err) {
      // if cart context isn't available for some reason, continue without blocking
      console.warn("Cart context unavailable:", err);
    }

    // ✅ Go to Payment page next
    navigate("/purchase/paymentEntry", { state: { order: updatedOrder } });
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
        <button type="submit">Next: Payment Info</button>
      </form>
    </div>
  );
};

export default Purchase;
