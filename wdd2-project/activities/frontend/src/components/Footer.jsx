import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <h3>FILMHOUSE</h3>
            <p>
              Curating the finest collection of classic and contemporary cinema. 
              Experience film the way it was meant to be seen.
            </p>
          </div>
          <div className="footer-section">
            <h4>Browse</h4>
            <ul className="footer-links">
              <li><Link to="/">All Films</Link></li>
              <li><Link to="/">New Releases</Link></li>
              <li><Link to="/">Classics</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Account</h4>
            <ul className="footer-links">
              <li><Link to="/auth">Sign In</Link></li>
              <li><Link to="/cart">Watchlist</Link></li>
              <li><Link to="/">Membership</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Filmhouse. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
