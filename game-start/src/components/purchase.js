import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function Purchase() {
  const navigate = useNavigate();
  const { addToCart, cartState, getTotalItems } = useCart();

  // Temporary product list — replace with your backend data if needed
  const products = [
    { id: 1, name: "Game Console", price: 299.99 },
    { id: 2, name: "Wireless Controller", price: 59.99 },
    { id: 3, name: "Headset", price: 89.99 },
  ];

  const handleCheckout = () => {
    if (cartState.items.length === 0) {
      alert("Please add items to your cart before proceeding.");
      return;
    }
    navigate("/purchase/shippingEntry");
  };

  return (
    <div>
      <h1>Welcome to Game-Start!</h1>
      <h2>Available Products</h2>

      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: "10px" }}>
          <strong>{product.name}</strong> - ${product.price.toFixed(2)}
          <button
            onClick={() => addToCart(product)}
            style={{ marginLeft: "10px" }}
          >
            Add to Cart
          </button>
        </div>
      ))}

      <h3>Items in Cart: {getTotalItems()}</h3>

      <button onClick={handleCheckout}>Proceed to Shipping</button>
    </div>
  );
}

export default Purchase;
