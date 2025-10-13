import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function ViewOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartState, getTotalPrice, getTotalItems } = useCart();

  const shippingData = location.state?.shippingData;

  if (!shippingData) {
    return (
      <div>
        <h1>Game-Start View Order Page</h1>
        <p>No shipping information found.</p>
        <button onClick={() => navigate("/purchase/shippingEntry")}>
          Go to Shipping Entry
        </button>
      </div>
    );
  }

  const handleConfirmOrder = () => {
    navigate("/purchase/confirmation", { state: { shippingData } });
  };

  return (
    <div>
      <h1>View Order</h1>

      <h2>Items</h2>
      {cartState.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartState.items.map((item) => (
            <div key={item.id}>
              {item.name} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
            </div>
          ))}
        </>
      )}

      <h3>Total Items: {getTotalItems()}</h3>
      <h3>Total Price: ${getTotalPrice().toFixed(2)}</h3>

      <h2>Shipping Address</h2>
      <p>
        {shippingData.addressLine1} <br />
        {shippingData.addressLine2 && <>{shippingData.addressLine2}<br /></>}
        {shippingData.city}, {shippingData.state} {shippingData.zip}
      </p>

      <button onClick={() => navigate("/purchase/shippingEntry")}>Back</button>
      <button onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
  );
}

export default ViewOrder;
