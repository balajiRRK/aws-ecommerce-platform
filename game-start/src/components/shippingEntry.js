import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ShippingEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevOrder =
    location.state?.order || JSON.parse(localStorage.getItem("orderData")) || {};

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
<<<<<<< Updated upstream
=======
    country: "",
    email: savedEmail,
>>>>>>> Stashed changes
  });

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !shippingInfo.fullName ||
      !shippingInfo.address1 ||
      !shippingInfo.city ||
      !shippingInfo.state ||
<<<<<<< Updated upstream
      !shippingInfo.zip
=======
      !shippingInfo.zip ||
      !shippingInfo.country ||
      !shippingInfo.email
>>>>>>> Stashed changes
    ) {
      alert("Please fill in all required fields");
      return;
    }

    localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
    navigate("/purchase/viewOrder", { state: { order: prevOrder } });
  };

  return (
    <div className="container-fluid">
      <div className="hero-section">
        <h1>📦 Shipping Information</h1>
        <p>Where should we deliver your games?</p>
      </div>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-6">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h2 className="h4 text-center mb-1">Delivery Address</h2>
                <p className="text-center text-muted mb-4">Please provide your shipping details</p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address1" className="form-label">Address Line 1</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address1"
                      name="address1"
                      value={shippingInfo.address1}
                      onChange={handleChange}
                      placeholder="123 Main St"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address2" className="form-label">Address Line 2 <span className="text-muted">(optional)</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="address2"
                      name="address2"
                      value={shippingInfo.address2}
                      onChange={handleChange}
                      placeholder="Apt, Suite, etc."
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <label htmlFor="city" className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleChange}
                        required
                        placeholder="Columbus"
                      />
                    </div>

                    <div className="col-md-2 mb-3">
                      <label htmlFor="state" className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleChange}
                        required
                        placeholder="OH"
                        maxLength="2"
                      />
                    </div>

                    <div className="col-md-2 mb-3">
                      <label htmlFor="zip" className="form-label">ZIP Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zip"
                        name="zip"
                        value={shippingInfo.zip}
                        onChange={handleChange}
                        required
                        placeholder="43004"
                        maxLength="10"
                      />
                    </div>

                    <div className="col-md-3 mb-3">
                      <label htmlFor="country" className="form-label">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleChange}
                        required
                        placeholder="USA"
                      />
                    </div>
                  </div>


                  <div className="alert alert-warning d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-truck me-2" viewBox="0 0 16 16">
                      <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                    <small>Standard shipping: 5-7 business days</small>
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Next: Review Order →
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={() => navigate(-1)}
                    >
                      ← Back
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingEntry;
