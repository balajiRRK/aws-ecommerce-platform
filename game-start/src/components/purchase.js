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

    // Go to Payment page next
    navigate("/purchase/paymentEntry", { state: { order: updatedOrder } });
  };

  const handleChange = (index, value) => {
    const newOrder = { ...order };
    newOrder.buyQuantity[index] = value;
    setOrder(newOrder);
  };

  return (
    <div className="container-fluid">
      <div className="hero-section">
        <h1>Shop Games</h1>
        <p>Pick your favorites and start playing today</p>
      </div>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h2 className="h3 text-center mb-1">Game-Start Store</h2>
                <p className="text-center text-muted mb-4">Select the games you want and choose quantities.</p>

                <form onSubmit={handleSubmit}>
                  <ul className="list-group mb-4">
                    {products.map((product, idx) => (
                      <li
                        className="list-group-item d-flex align-items-center justify-content-between"
                        key={idx}
                      >
                        <div className="me-3">
                          <div className="fw-semibold">{product.name}</div>
                          <div className="text-muted small">${product.price.toFixed(2)}</div>
                        </div>
                        <div className="input-group input-group-sm" style={{ maxWidth: "160px" }}>
                          <span className="input-group-text">Qty</span>
                          <input
                            id={`product-${idx}`}
                            type="number"
                            min="0"
                            className="form-control text-end"
                            value={order.buyQuantity[idx] || ""}
                            onChange={(e) => handleChange(idx, e.target.value)}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Next: Payment Info
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
