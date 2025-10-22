import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StatePayload } from "../StatePayload";
import { useCart } from "../contexts/CartContext";
import { inventoryService, handleAPIError } from "../services/api";

const Purchase = () => {
  const [order, setOrder] = useState(StatePayload);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart, clearCart } = useCart();

  // Fetch inventory from API on component mount
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await inventoryService.getAllItems();
        
        if (response.success && response.data) {
          setProducts(response.data);
          // Initialize buyQuantity array for all products
          const initialQuantities = new Array(response.data.length).fill(0);
          setOrder(prev => ({ ...prev, buyQuantity: initialQuantities }));
        } else {
          throw new Error('Failed to load inventory');
        }
      } catch (err) {
        console.error('Error loading inventory:', err);
        const errorInfo = handleAPIError(err);
        setError(errorInfo.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const items = products
      .map((product, idx) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: parseInt(order.buyQuantity[idx]) || 0,
      }))
      .filter((item) => item.quantity > 0);

    if (items.length === 0) {
      alert("Please select at least one item before proceeding.");
      return;
    }

    // Check if requested quantities exceed available stock
    const invalidItems = items.filter((item, idx) => {
      const product = products.find(p => p.id === item.id);
      return item.quantity > product.quantity;
    });

    if (invalidItems.length > 0) {
      const itemNames = invalidItems.map(item => {
        const product = products.find(p => p.id === item.id);
        return `${item.name} (available: ${product.quantity}, requested: ${item.quantity})`;
      }).join('\n');
      alert(`The following items have insufficient stock:\n\n${itemNames}\n\nPlease adjust your quantities.`);
      return;
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const updatedOrder = { ...order, items, total };
    setOrder(updatedOrder);
    localStorage.setItem("orderData", JSON.stringify(updatedOrder));
    // Update cart context so ShoppingCart shows the chosen items
    try {
      // clear any existing cart content for this flow and add new selections
      clearCart();
      items.forEach((item) => {
        addToCart({ id: item.id, name: item.name, price: item.price }, item.quantity);
      });
    } catch (err) {
      // if cart context isn't available for some reason, continue without blocking
      console.warn("Cart context unavailable:", err);
    }

    // Go to Payment page next
    navigate("/purchase/paymentEntry", { state: { order: updatedOrder } });
  };

  const handleChange = (index, value) => {
    const newOrder = { ...order };
    newOrder.buyQuantity[index] = value;
    setOrder(newOrder);
  };

  return (
    <div className="container-fluid">
      <div className="hero-section">
        <h1>Shop Games</h1>
        <p>Pick your favorites and start playing today</p>
      </div>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <h2 className="h3 text-center mb-1">Game-Start Store</h2>
                <p className="text-center text-muted mb-4">Select the games you want and choose quantities.</p>

                {loading && (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading available games...</p>
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger" role="alert">
                    <h5 className="alert-heading">Error Loading Inventory</h5>
                    <p className="mb-0">{error}</p>
                    <button 
                      className="btn btn-sm btn-outline-danger mt-2"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {!loading && !error && products.length === 0 && (
                  <div className="alert alert-info" role="alert">
                    <p className="mb-0">No games available at this time. Please check back later!</p>
                  </div>
                )}

                {!loading && !error && products.length > 0 && (
                  <form onSubmit={handleSubmit}>
                    <ul className="list-group mb-4">
                      {products.map((product, idx) => (
                        <li
                          className="list-group-item d-flex align-items-center justify-content-between"
                          key={product.id}
                        >
                          <div className="me-3">
                            <div className="fw-semibold">{product.name}</div>
                            <div className="text-muted small">
                              ${product.price.toFixed(2)}
                              {product.platform && ` • ${product.platform}`}
                            </div>
                            <div className="text-success small">
                              {product.quantity > 0 
                                ? `${product.quantity} in stock` 
                                : 'Out of stock'}
                            </div>
                          </div>
                          <div className="input-group input-group-sm" style={{ maxWidth: "160px" }}>
                            <span className="input-group-text">Qty</span>
                            <input
                              id={`product-${idx}`}
                              type="number"
                              min="0"
                              max={product.quantity}
                              className="form-control text-end"
                              value={order.buyQuantity[idx] || ""}
                              onChange={(e) => handleChange(idx, e.target.value)}
                              disabled={product.quantity === 0}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Next: Payment Info
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
