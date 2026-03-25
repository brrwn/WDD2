import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const firstName = user?.name?.split(" ")[0];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <header className="landing-header">
        <div className="header-container">
          <Link to="/" className="logo">
            <h2>FILMHOUSE</h2>
          </Link>
          <div className="auth-section">
            <nav className="navigation">
              <Link to="/">Home</Link>
              {user?.role !== "Admin" && (
                <Link to="/cart">
                  Cart
                  {getTotalItems() > 0 && (
                    <span className="cart-badge">{getTotalItems()}</span>
                  )}
                </Link>
              )}
              {user?.role === "Admin" && (
                <Link to="/inventory">Collection</Link>
              )}
            </nav>
            {user ? (
              <>
                <span className="user-name">Welcome, {firstName}!</span>
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
                Login
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
