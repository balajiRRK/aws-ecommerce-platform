import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState({});
  const [shippingInfo, setShippingInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    const savedOrder =
      location.state?.order || JSON.parse(localStorage.getItem("orderData")) || {};
    const savedShipping =
      JSON.parse(localStorage.getItem("shippingInfo")) || {};
    const savedPayment =
      JSON.parse(localStorage.getItem("paymentInfo")) || {};

    setOrder(savedOrder);
    setShippingInfo(savedShipping);
    setPaymentInfo(savedPayment);
  }, [location.state]);

  const orderNumber = Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleBackToShop = () => {
    localStorage.clear();
    navigate("/purchase");
  };

  return (
    <div className="confirmation-container">
      <h2>Order Confirmed!</h2>
      <p>Order Number: {orderNumber}</p>
      <p>
        Estimated Delivery:{" "}
        {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
          "en-US",
          { weekday: "long", month: "long", day: "numeric", year: "numeric" }
        )}
      </p>

      <h3>Order Summary</h3>
      <ul>
        {order.items?.map((item, idx) => (
          <li key={idx}>
            {item.name} × {item.quantity} — $
            {(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>
        <strong>Total Amount Paid:</strong> $
        {order.total?.toFixed(2) || "0.00"}
      </p>

      <h3>Shipping Info</h3>
      <p>{shippingInfo.fullName}</p>
      <p>{shippingInfo.address1}</p>
      {shippingInfo.address2 && <p>{shippingInfo.address2}</p>}
      <p>
        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
      </p>

      <h3>Payment Info</h3>
      <p>Cardholder: {paymentInfo.cardholderName}</p>
      <p>Card: **** **** **** {paymentInfo.cardNumber?.slice(-4)}</p>

      <button onClick={handleBackToShop}>Back to Store</button>
    </div>
  );
};

export default ViewConfirmation;
