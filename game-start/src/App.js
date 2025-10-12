import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Purchase from "./components/purchase";
import PaymentEntry from "./components/paymentEntry";
import ViewOrder from "./components/viewOrder";
import ShippingEntry from "./components/shippingEntry";
import Confirmation from "./components/Confirmation";
import { StatePayload } from "./StatePayload";

function App() {
  const [order, setOrder] = useState(StatePayload);

  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate replace to="/purchase" />} />
            <Route
              path="/purchase"
              element={<Purchase order={order} setOrder={setOrder} />}
            />
            <Route
              path="/purchase/paymentEntry"
              element={<PaymentEntry order={order} setOrder={setOrder} />}
            />
            <Route
              path="/purchase/shippingEntry"
              element={<ShippingEntry order={order} setOrder={setOrder} />}
            />
            <Route
              path="/purchase/viewOrder"
              element={<ViewOrder order={order} setOrder={setOrder} />}
            />
            <Route
              path="/purchase/confirmation"
              element={<Confirmation order={order} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
