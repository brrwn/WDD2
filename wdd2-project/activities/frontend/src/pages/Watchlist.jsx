import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { productService } from "../services/productService";
import "./Watchlist.css";

const Watchlist = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [watchlistProducts, setWatchlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlistProducts = async () => {
      const savedWatchlist = localStorage.getItem("likedProducts");
      if (savedWatchlist) {
        const watchlistIds = JSON.parse(savedWatchlist);
        try {
          const allProducts = await productService.getAllProducts();
          const products = allProducts.filter((p) =>
            watchlistIds.includes(p._id),
          );
          setWatchlistProducts(products);
        } catch (err) {
          console.error("Failed to load watchlist:", err);
        }
      }
      setLoading(false);
    };

    fetchWatchlistProducts();
  }, []);

  const handleRemoveFromWatchlist = (productId) => {
    const savedWatchlist = localStorage.getItem("likedProducts");
    if (savedWatchlist) {
      const watchlistProducts = JSON.parse(savedWatchlist);
      const updatedWatchlist = watchlistProducts.filter(
        (id) => id !== productId,
      );
      localStorage.setItem("likedProducts", JSON.stringify(updatedWatchlist));
      setWatchlistProducts(
        watchlistProducts.filter((p) => p._id !== productId),
      );
    }
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div>
      <div className="watchlist-container">
        <h1>My Watchlist</h1>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : watchlistProducts.length === 0 ? (
          <div className="empty-watchlist">
            <p>You haven't added any products to your watchlist yet</p>
            <Button onClick={handleContinueShopping} variant="primary">
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="watchlist-content">
            <div className="watchlist-grid">
              {watchlistProducts.map((product) => (
                <div key={product._id} className="watchlist-card">
                  <div
                    className="watchlist-image"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="watchlist-info">
                    <h3>{product.name}</h3>
                    <p className="watchlist-price">
                      ₱{product.price.toFixed(2)}
                    </p>
                    <p
                      className={`watchlist-stock ${product.countInStock === 0 ? "out-of-stock" : "in-stock"}`}
                    >
                      {product.countInStock === 0
                        ? "Out of Stock"
                        : `${product.countInStock} in stock`}
                    </p>
                    <button
                      className="btn-remove-watchlist"
                      onClick={() => handleRemoveFromWatchlist(product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Watchlist;
