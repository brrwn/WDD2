import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import "./ProductCard.css";

const truncateAtWord = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + "...";
  }
  return truncated + "...";
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(() => {
    const savedLikes = localStorage.getItem("likedProducts");
    if (savedLikes) {
      return JSON.parse(savedLikes).includes(product._id);
    }
    return false;
  });
  const [addedToCart, setAddedToCart] = useState(false);

  const isAdmin = user?.role === "Admin";
  const isOutOfStock = product.countInStock === 0;

  const handleCardClick = (e) => {
    if (
      e.target.closest(".product-card-actions") ||
      e.target.closest(".btn-add-to-cart") ||
      e.target.closest(".btn-like")
    ) {
      return;
    }
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate("/auth", { state: { from: `/product/${product._id}` } });
      return;
    }
    addToCart(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate("/auth", { state: { from: "/" } });
      return;
    }
    const savedLikes = localStorage.getItem("likedProducts");
    let likedProducts = savedLikes ? JSON.parse(savedLikes) : [];

    if (isLiked) {
      likedProducts = likedProducts.filter((id) => id !== product._id);
    } else {
      likedProducts.push(product._id);
    }

    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    setIsLiked(!isLiked);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {!isAdmin && (
          <button
            className={`btn-like ${isLiked ? "liked" : ""}`}
            onClick={handleToggleLike}
            aria-label={isLiked ? "Remove from likes" : "Add to likes"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">
          {truncateAtWord(product.description, 80)}
        </p>
        {!isAdmin && (
          <>
            <div className="product-card-footer">
              <div className="product-price-stock">
                <span className="product-price">₱{product.price.toFixed(2)}</span>
                <span
                  className={`product-stock ${
                    isOutOfStock ? "out-of-stock" : "in-stock"
                  }`}
                >
                  {isOutOfStock ? "Out of Stock" : `${product.countInStock} in stock`}
                </span>
              </div>
              <button
                className={`btn-add-to-cart ${addedToCart ? "added" : ""}`}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                {addedToCart ? "Added ✓" : "Add to Cart"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
