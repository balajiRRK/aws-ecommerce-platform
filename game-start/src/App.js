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
import { CartProvider } from "./contexts/CartContext";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Router>
          <div className="content">
            <div className="app-header">
              <ShoppingCart />
            </div>
            <Routes>
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/" element={<Navigate replace to="/purchase" />} />
              <Route path="/purchase/paymentEntry" element={<PaymentEntry />} />
              <Route
                path="/purchase/shippingEntry"
                element={<ShippingEntry />}
              />
              <Route path="/purchase/viewOrder" element={<ViewOrder />} />
              <Route path="/purchase/confirmation" element={<Confirmation />} />
            </Routes>
          </div>
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
