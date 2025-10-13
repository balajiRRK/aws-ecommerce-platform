import "./styles.css";
import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import Purchase from "./components/purchase";
import PaymentEntry from "./components/paymentEntry";
import ShippingEntry from "./components/shippingEntry";
import ViewOrder from "./components/viewOrder";
import ViewConfirmation from "./components/ViewConfirmation";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import { CartProvider } from "./contexts/CartContext";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Router>
          <div className="content">
            <div className="app-header">
                <nav className="navbar navbar-expand-lg navbar-dark" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                  <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/purchase">
                      🏪 GameHub Store
                    </Link>
                  
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                  
                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                          <Link className="nav-link" to="/purchase">Home</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/about">About Us</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/contact">Contact Us</Link>
                        </li>
                      </ul>
                      <div className="navbar-nav">
                        <ShoppingCart />
                      </div>
                    </div>
                  </div>
              </nav>
            </div>

            <Routes>
              <Route path="/" element={<Navigate replace to="/purchase" />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/purchase/paymentEntry" element={<PaymentEntry />} />
              <Route
                path="/purchase/shippingEntry"
                element={<ShippingEntry />}
              />
              <Route path="/purchase/viewOrder" element={<ViewOrder />} />
              <Route
                path="/purchase/viewConfirmation"
                element={<ViewConfirmation />}
              />
            </Routes>
          </div>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
