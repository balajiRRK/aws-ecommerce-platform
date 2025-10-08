import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { StatePayload } from "../StatePayload";

const PaymentEntry = () => {
  let title = "Game-Start Payment Entry Page";
  const { cartState, getTotalPrice } = useCart();

  // Use StatePayload's credit_card_data as initial form state
  const [form, setForm] = useState(StatePayload.credit_card_data);
  const [processing, setProcessing] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    // Here you could update order with form data or send to backend
    console.log("Submitting payment with data:", form);

    setTimeout(() => {
      alert("Payment successful!");
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="payment-container">
      <h1>{title}</h1>

      <div className="order-summary">
        <h3>Order Summary</h3>
        {cartState.items.length === 0 ? (
          <p>No items in cart. Please go back and add items.</p>
        ) : (
          <>
            {cartState.items.map((item) => (
              <div key={item.id} className="order-item">
                <span>{item.name}</span>
                <span> Qty: {item.quantity}</span>
                <span> ${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total">
              <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
            </div>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: 16, maxWidth: 480 }}>
        <h3>Payment</h3>

        <label>
          Card Holder Name
          <input
            name="card_holder_name"
            value={form.card_holder_name}
            onChange={(e) => {
              const value = e.target.value;
              // Only update if it matches allowed characters
              if (/^[a-zA-Z\s]*$/.test(value)) {
                setForm((f) => ({ ...f, card_holder_name: value }));
              }
            }}
            placeholder="John Smith"
            required
          />
        </label>

        <label>
          Card number
          <input
            name="card_number"
            value={form.card_number}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                card_number: e.target.value.replace(/\D/g, ""),
              }))
            }
            inputMode="numeric"
            maxLength={19}
            placeholder="1234123412341234"
            required
          />
        </label>

        <label>
          Expiration date
          <input
            name="expir_date"
            value={form.expir_date}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </label>

        <label>
          CVV
          <input
            name="cvvCode"
            value={form.cvvCode}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                cvvCode: e.target.value.replace(/\D/g, ""),
              }))
            }
            inputMode="numeric"
            maxLength={4}
            placeholder="123"
            required
          />
        </label>

        <div style={{ marginTop: 12 }}>
          <button
            type="submit"
            disabled={processing || cartState.items.length === 0}
          >
            {processing
              ? "Processing..."
              : `Pay $${getTotalPrice().toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentEntry;
