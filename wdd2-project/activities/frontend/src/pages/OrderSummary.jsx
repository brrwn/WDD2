import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { orderService } from "../services/orderService";
import "./OrderSummary.css";

const OrderSummaryPage = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  if (!isAuthenticated) {
    return (
      <div>
        <div className="order-summary-container">
          <div className="auth-required">
            <p>Please log in to proceed with checkout.</p>
            <Button onClick={() => navigate("/auth")}>Go to Login</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0 && !orderComplete) {
    return (
      <div>
        <div className="order-summary-container">
          <div className="cart-empty">
            <p>Your cart is empty. Please add items before checking out.</p>
            <Button onClick={() => navigate("/")}>Continue Shopping</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div>
        <div className="order-summary-container">
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your purchase.</p>
            {orderId && <p className="order-id">Order ID: {orderId}</p>}
            <Button onClick={() => navigate("/")} className="btn-primary">
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const shippingFee = 50;
  const finalTotal = totalPrice + shippingFee;

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        shippingAddress: {
          fullName: user?.name || "",
          email: user?.email || "",
        },
        paymentMethod: "COD",
      };

      const order = await orderService.createOrder(orderData);
      setOrderId(order._id);
      clearCart();
      setOrderComplete(true);
    } catch (error) {
      alert("Error placing order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="order-summary-container">
        <h1>Order Summary</h1>

        <div className="order-summary-content">
          <div className="order-items-section">
            <h2>Your Items</h2>
            <div className="order-items-list">
              {cart.map((item) => (
                <div key={item.productId} className="order-item-card">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-qty">Quantity: {item.quantity}</p>
                    <p className="item-price">₱{item.price.toFixed(2)} each</p>
                  </div>
                  <div className="item-total">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-totals-section">
            <div className="totals-card">
              <h2>Order Total</h2>
              <div className="totals-row">
                <span>Subtotal:</span>
                <span>₱{totalPrice.toFixed(2)}</span>
              </div>
              <div className="totals-row">
                <span>Shipping:</span>
                <span>₱{shippingFee.toFixed(2)}</span>
              </div>
              <div className="totals-row final">
                <span>Total:</span>
                <span>₱{finalTotal.toFixed(2)}</span>
              </div>

              <p className="payment-method">
                Payment Method: Cash on Delivery
              </p>

              <Button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="btn-place-order"
              >
                {loading ? "Processing..." : "Place Order"}
              </Button>

              <button
                onClick={() => navigate("/cart")}
                className="btn-back"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSummaryPage;
