import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";

const ShoppingCart = () => {
  const {
    cartState,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart(); //useCart() is the custom hook made to bring over all the helper methods from CartProvider!
  const [isOpen, setIsOpen] = useState(false); //Managing the UI state, while useCart() manages the business logic state, which we might want to maybe move to the backend eventually in some capacity...

  //Helper function to respond to whenever the user increments or decrements a quantity
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="shopping-cart">
      {/* This is where we want to place any fun icons, for lab #6*/}
      <button
        className="cart-button"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="cart-button"
      >
        🛒 Shopping Cart ({getTotalItems()})
      </button>

      {/* Cart Dropdown/Modal Related Content!*/}
      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h3>Shopping Cart</h3>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>

          <div className="cart-content">
            {cartState.items.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              <>
                <div className="cart-items">
                  {cartState.items.map((item) => (
                    <div
                      key={item.id}
                      className="cart-item"
                      data-testid={`cart-item-${item.id}`}
                    >
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>${item.price.toFixed(2)} each</p>
                      </div>

                      <div className="item-controls">
                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="quantity-btn"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                parseInt(e.target.value) || 0
                              )
                            }
                            min="0"
                            className="quantity-input"
                            data-testid={`quantity-input-${item.id}`}
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="quantity-btn"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="remove-btn"
                          data-testid={`remove-item-${item.id}`}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
                  </div>

                  <div className="cart-actions">
                    <button
                      onClick={clearCart}
                      className="clear-cart-btn"
                      data-testid="clear-cart-button"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="checkout-btn"
                      data-testid="checkout-button"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
