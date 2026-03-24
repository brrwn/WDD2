import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useCart } from "../contexts/CartContext";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCart();

  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Button onClick={handleContinueShopping} className="btn-primary">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item._id}>
                      <td className="product-name">
                        <img src={item.image} alt={item.name} className="product-thumbnail" />
                        {item.name}
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max={item.countInStock}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item._id, parseInt(e.target.value))
                          }
                          className="quantity-input"
                        />
                      </td>
                      <td className="item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="btn-remove"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="summary-total">
                  <span>Total:</span>
                  <span>${(totalPrice * 1.1).toFixed(2)}</span>
                </div>

                <Button onClick={handleCheckout} className="btn-checkout">
                  Proceed to Checkout
                </Button>

                <button
                  onClick={handleContinueShopping}
                  className="btn-continue-shopping"
                >
                  Continue Shopping
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Clear your entire cart?")) {
                      clearCart();
                    }
                  }}
                  className="btn-clear"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
