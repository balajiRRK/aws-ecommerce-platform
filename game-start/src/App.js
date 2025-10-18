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
import Home from "./components/Home";

function App() {
  return (
    <CartProvider>
      <div className="App d-flex flex-column min-vh-100">
        <Router>
          <div className="content flex-grow-1 d-flex flex-column">
            <div className="app-header">
                <nav className="navbar navbar-expand-lg navbar-dark" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                  <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/home">
                      🏪 GameHub Store
                    </Link>
                  
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                  
                    <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav me-auto">
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
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/home" element={<Home />} />
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

            <footer
              className="py-4 text-white text-center mt-auto"
              style={{
                background: '#5a2ca0',
                backdropFilter: 'blur(5px)',
                fontSize: '0.9rem',
              }}
            >
              <div className="container">
                <p className="mb-0">&copy; 2025 GameVault. All rights reserved.</p>
              </div>
            </footer>

          </div>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;