import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ViewOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const order =
    location.state?.order || JSON.parse(localStorage.getItem("orderData")) || {};
  const shippingInfo =
    JSON.parse(localStorage.getItem("shippingInfo")) || {};
  const paymentInfo =
    JSON.parse(localStorage.getItem("paymentInfo")) || {};

  const handleConfirm = () => {
    // save confirmation flag or similar if needed
    navigate("/purchase/viewConfirmation", { state: { order } });
  };

  return (
    <div className="container-fluid">
      <div className="hero-section">
        <h1>📋 Review Your Order</h1>
        <p>Please verify all details before confirming</p>
      </div>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-primary text-white">
                <h3 className="h5 mb-0">Order Items</h3>
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
                    <h4 className="mb-0">Total</h4>
                    <h4 className="mb-0 text-primary">${order.total?.toFixed(2) || "0.00"}</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm mb-4">
              <div className="card-header bg-success text-white">
                <h3 className="h5 mb-0">💳 Payment Information</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p className="mb-1"><strong>Cardholder:</strong></p>
                    <p className="text-muted">{paymentInfo.cardholderName || "N/A"}</p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-1"><strong>Card:</strong></p>
                    <p className="text-muted">**** **** **** {paymentInfo.cardNumber?.slice(-4) || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm mb-4">
              <div className="card-header bg-info text-white">
                <h3 className="h5 mb-0">📦 Shipping Address</h3>
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

            <div className="alert alert-warning d-flex align-items-start" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill me-2 flex-shrink-0" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <div>
                <strong>Please review carefully!</strong> Once you confirm, your order will be processed and your payment method will be charged.
              </div>
            </div>

            <div className="d-grid gap-2">
              <button onClick={handleConfirm} className="btn btn-success btn-lg">
                ✓ Confirm & Place Order
              </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
              >
                ← Back to Shipping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
