import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { orderService } from "../services/orderService";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [shippingData, setShippingData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});

  if (!isAuthenticated) {
    return (
      <div>
        <div className="checkout-container">
          <div className="auth-required">
            <p>Please log in to proceed with checkout.</p>
            <Button onClick={() => navigate("/auth")}>Go to Login</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div>
        <div className="checkout-container">
          <div className="cart-empty">
            <p>Your cart is empty. Please add items before checking out.</p>
            <Button onClick={() => navigate("/")}>Continue Shopping</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!shippingData.fullName) newErrors.fullName = "Full name is required";
    if (!shippingData.email) newErrors.email = "Email is required";
    if (!shippingData.address) newErrors.address = "Address is required";
    if (!shippingData.city) newErrors.city = "City is required";
    if (!shippingData.postalCode) newErrors.postalCode = "Postal code is required";
    if (!shippingData.country) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        shippingAddress: shippingData,
        paymentMethod: "COD",
      };

      await orderService.createOrder(orderData);
      alert("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (error) {
      alert("Error placing order: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = getTotalPrice();
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + tax;

  return (
    <div>
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-content">
          <div className="shipping-form-section">
            <h2>Shipping Address</h2>
            <form onSubmit={handleSubmit} className="shipping-form">
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                value={shippingData.fullName}
                onChange={handleInputChange}
                error={errors.fullName}
                required
              />
              <Input
                label="Email"
                type="email"
                name="email"
                value={shippingData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
              />
              <Input
                label="Address"
                type="text"
                name="address"
                value={shippingData.address}
                onChange={handleInputChange}
                error={errors.address}
                required
              />

              <div className="form-row">
                <Input
                  label="City"
                  type="text"
                  name="city"
                  value={shippingData.city}
                  onChange={handleInputChange}
                  error={errors.city}
                  required
                />
                <Input
                  label="State"
                  type="text"
                  name="state"
                  value={shippingData.state}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <Input
                  label="Postal Code"
                  type="text"
                  name="postalCode"
                  value={shippingData.postalCode}
                  onChange={handleInputChange}
                  error={errors.postalCode}
                  required
                />
                <Input
                  label="Country"
                  type="text"
                  name="country"
                  value={shippingData.country}
                  onChange={handleInputChange}
                  error={errors.country}
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="btn-place-order">
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>

          <div className="order-summary-section">
            <div className="order-summary-card">
              <h2>Order Summary</h2>

              <div className="order-items">
                <h3>Items:</h3>
                {cart.map((item) => (
                  <div key={item._id} className="order-item">
                    <div className="item-info">
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                    <p className="item-price">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>₱{totalPrice.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="total-row">
                  <span>Tax (10%):</span>
                  <span>₱{tax.toFixed(2)}</span>
                </div>
                <div className="total-row final">
                  <span>Total:</span>
                  <span>₱{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <p className="payment-note">
                <strong>Payment Method:</strong> Cash on Delivery
              </p>
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="btn-back-to-cart"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
