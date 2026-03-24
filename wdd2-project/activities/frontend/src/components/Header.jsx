import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <header className="landing-header">
        <div className="header-container">
          <Link to="/" className="logo">
            <h2>Store</h2>
          </Link>
          <nav className="navigation">
            <Link to="/">Home</Link>
            <Link to="/cart">
              Cart
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </Link>
            {user?.role === "Admin" && (
              <Link to="/inventory">Inventory</Link>
            )}
          </nav>
          <div className="auth-section">
            {user ? (
              <>
                <span className="user-name">Welcome, {user.name}!</span>
                <Button
                  onClick={handleLogout}
                  className="btn-logout"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                className="btn-login"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
