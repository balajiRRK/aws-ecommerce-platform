import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function ShippingEntry() {
  const navigate = useNavigate();
  const { cartState, getTotalPrice } = useCart();

  const [shippingData, setShippingData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!shippingData.addressLine1 || !shippingData.city || !shippingData.state || !shippingData.zip) {
      alert("Please fill in all required fields");
      return;
    }

    navigate("/purchase/viewOrder", { state: { shippingData } });
  };

  return (
    <div>
      <h1>Game-Start Shipping Entry Page</h1>

      <h2>Order Summary</h2>
      {cartState.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartState.items.map((item) => (
            <div key={item.id}>
              {item.name} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
            </div>
          ))}
          <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
        </>
      )}

      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Address Line 1:
          <input name="addressLine1" value={shippingData.addressLine1} onChange={handleChange} required />
        </label>
        <label>
          Address Line 2:
          <input name="addressLine2" value={shippingData.addressLine2} onChange={handleChange} />
        </label>
        <label>
          City:
          <input name="city" value={shippingData.city} onChange={handleChange} required />
        </label>
        <label>
          State:
          <input name="state" value={shippingData.state} onChange={handleChange} required />
        </label>
        <label>
          ZIP:
          <input name="zip" value={shippingData.zip} onChange={handleChange} required />
        </label>
        <button type="submit">Continue to Review Order</button>
      </form>
    </div>
  );
}

export default ShippingEntry;
