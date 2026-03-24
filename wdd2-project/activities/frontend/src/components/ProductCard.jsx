import { useState } from "react";
import Button from "./Button";
import "./ProductCard.css";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);

    // Reset after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
      setQuantity(1);
    }, 2000);
  };

  const isOutOfStock = product.countInStock === 0;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {isOutOfStock && <div className="out-of-stock">Out of Stock</div>}
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <div className="product-stock">
            Stock: <span>{product.countInStock}</span>
          </div>
        </div>

        {!isOutOfStock && (
          <div className="product-quantity">
            <select
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="quantity-select"
            >
              {Array.from({ length: Math.min(product.countInStock, 10) }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`btn-add-cart ${addedToCart ? "added" : ""}`}
        >
          {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
