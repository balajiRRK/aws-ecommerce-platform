import React from "react";

export default function Confirmation() {
  return (
    <div className="confirmation">
      <h2>Order Confirmed 🎉</h2>
      <p>Thank you for your purchase! Your order will be processed shortly.</p>
      <button onClick={() => window.location.href="/purchase"}>
        Return Home
      </button>
    </div>
  );
}
