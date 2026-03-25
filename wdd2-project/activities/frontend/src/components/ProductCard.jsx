import { useNavigate } from "react-router-dom";
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

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{truncateAtWord(product.description, 80)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
