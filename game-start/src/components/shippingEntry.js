import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ShippingEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevOrder =
    location.state?.order || JSON.parse(localStorage.getItem("orderData")) || {};

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !shippingInfo.fullName ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.zip
    ) {
      alert("Please fill in all fields");
      return;
    }

    localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));

    // ✅ After shipping, go to payment
    navigate("/purchase/paymentEntry", { state: { order: prevOrder } });
  };

  return (
    <div className="form-container">
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            placeholder="123 Main St"
            required
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={handleChange}
            placeholder="New York"
            required
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={shippingInfo.state}
            onChange={handleChange}
            placeholder="NY"
            required
          />
        </div>

        <div className="form-group">
          <label>ZIP Code</label>
          <input
            type="text"
            name="zip"
            value={shippingInfo.zip}
            onChange={handleChange}
            placeholder="10001"
            required
          />
        </div>

        <button type="submit">Next: Payment Info</button>
      </form>
    </div>
  );
};

export default ShippingEntry;
