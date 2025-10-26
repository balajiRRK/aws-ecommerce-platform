import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { inventoryService, handleAPIError } from "../services/api"

const ViewConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState({});
  const [shippingInfo, setShippingInfo] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    const postOrder = async () => {
      try {
        setError(null);
        console.log("savedOrder.items:", savedOrder.items)
        const response = await inventoryService.checkAvailability(savedOrder.items);
        console.log("response:", response)
        console.log("response.success:", response.success)
        console.log("response.data:", response.data)
         
        if (response.success && response.data)
        { 
          console.log("it worked")
        } else {
          console.log("it failed")
        }
      } catch (err) {
        console.error('Error confirming order:', err);
        const errorInfo = handleAPIError(err);
        setError(errorInfo.message);
      } finally {
        setLoading(false)
      }
    };
  
    // ------------

    // const savedOrder =
    //   location.state?.order || JSON.parse(localStorage.getItem("orderData")) || {};
    // const savedShipping =
    //   JSON.parse(localStorage.getItem("shippingInfo")) || {};
    // const savedPayment =
    //   JSON.parse(localStorage.getItem("paymentInfo")) || {};

    // setOrder(savedOrder);
    // setShippingInfo(savedShipping);
    // setPaymentInfo(savedPayment);
    postOrder();
  }, [location.state]);

  const orderNumber = Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleBackToShop = () => {
    localStorage.clear();
    navigate("/purchase");
  };

  return (
    // {loading && (
    //   <div className="text-center py-5">
    //     <div className="spinner-border text-primary" role="status">
    //       <span className="visually-hidden">Loading...</span>
    //     </div>
    //     <p className="mt-3 text-muted">Loading available games...</p>
    //   </div>
    // )}

    <div className="container-fluid">
      <div className="hero-section bg-success">
        <h1>✓ Order Confirmed!</h1>
        <p>Thank you for your purchase</p>
      </div>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div className="alert alert-success shadow-sm d-flex align-items-center mb-4" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check-circle-fill me-3 flex-shrink-0" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
              <div>
                <h4 className="alert-heading mb-1">Success! Your order has been placed</h4>
                <p className="mb-0">
                  <strong>Order Number:</strong> #{orderNumber}
                  <br />
                  <strong>Estimated Delivery:</strong> {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
                    "en-US",
                    { weekday: "long", month: "long", day: "numeric", year: "numeric" }
                  )}
                </p>
              </div>
            </div>

            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h3 className="h5 mb-0">Order Summary</h3>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {order.items?.map((item, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{item.name}</strong>
                        <div className="text-muted small">Quantity: {item.quantity}</div>
                      </div>
                      <span className="badge bg-primary rounded-pill">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-top">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Total Amount Paid</h4>
                    <h4 className="mb-0 text-success">${order.total?.toFixed(2) || "0.00"}</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-info text-white">
                    <h3 className="h6 mb-0">📦 Shipping To</h3>
                  </div>
                  <div className="card-body">
                    <address className="mb-0">
                      <strong>{shippingInfo.fullName}</strong><br />
                      {shippingInfo.address1}<br />
                      {shippingInfo.address2 && <>{shippingInfo.address2}<br /></>}
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
                    </address>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-header bg-success text-white">
                    <h3 className="h6 mb-0">💳 Payment Method</h3>
                  </div>
                  <div className="card-body">
                    <p className="mb-1"><strong>Cardholder:</strong></p>
                    <p className="text-muted mb-2">{paymentInfo.cardholderName}</p>
                    <p className="mb-1"><strong>Card:</strong></p>
                    <p className="text-muted mb-0">**** **** **** {paymentInfo.cardNumber?.slice(-4)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title">📧 What happens next?</h5>
                <ul className="mb-0">
                  <li>You'll receive a confirmation email shortly</li>
                  <li>We'll send you tracking information once your order ships</li>
                  <li>Your games will arrive within 5-7 business days</li>
                  <li>Need help? Contact our support team anytime</li>
                </ul>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button onClick={handleBackToShop} className="btn btn-primary btn-lg">
                ← Back to Store
              </button>
              <button 
                className="btn btn-outline-secondary"
                onClick={() => window.print()}
              >
                🖨️ Print Confirmation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewConfirmation;
