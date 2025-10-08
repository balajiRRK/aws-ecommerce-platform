import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatePayload } from "../StatePayload";
import { useCart } from "../contexts/CartContext";

const Purchase = () => {
  const [order, setOrder] = useState(StatePayload);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate(); //This is our hook for React
  const { addToCart } = useCart();
  let title = "Game-Start Purchase Page";

  //This action handler is used to route to our next page
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/purchase/paymentEntry", { order: order, setOrder: setOrder });
  };

  console.log("order: ", order);

  // Example product names, replace with order.products if available
  // This is just hard coded right now, we'd eventually want it to populate with the data from the backend
  const products = [
    { id: 1, name: "Legend of Zelda: Breath of The Wild", price: 59.99 },
    { id: 2, name: "Just Dance 88", price: 49.99 },
    { id: 3, name: "Madden 2054", price: 69.99 },
    { id: 4, name: "NBA 2K54", price: 59.99 },
    { id: 5, name: "Flappy Bird", price: 9.99 },
  ];

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    if (quantity > 0) {
      addToCart(product, quantity);
      // Reset quantity after adding to cart
      setQuantities((prev) => ({
        ...prev,
        [product.id]: "",
      }));
    }
  };

  return (
    <div className="purchase-container">
      <h2>{title}</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <div className="product-controls">
              <input
                id={`product-${product.id}`}
                type="number"
                min="1"
                placeholder="Qty"
                value={quantities[product.id] || ""}
                data-testid={`product-input-${product.id}`}
                onChange={(e) =>
                  handleQuantityChange(
                    product.id,
                    parseInt(e.target.value) || ""
                  )
                }
                className="quantity-input"
              />
              <button
                type="button"
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-btn"
                data-testid={`add-to-cart-${product.id}`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <button className="button checkout-button" type="submit">
          Proceed to Checkout
        </button>
      </form>
    </div>
  );
};

export default Purchase;
