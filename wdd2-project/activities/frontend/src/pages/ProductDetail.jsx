import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { productService } from "../services/productService";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const isAdmin = user?.role === "Admin";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await productService.getProductById(id);
        setProduct(fetchedProduct);
        setEditData({
          name: fetchedProduct.name,
          description: fetchedProduct.description || "",
          price: fetchedProduct.price.toString(),
          countInStock: fetchedProduct.countInStock.toString(),
        });
        setImagePreview(fetchedProduct.image);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
      setQuantity(1);
    }, 2000);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, product.countInStock)));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("description", editData.description);
      formData.append("price", parseFloat(editData.price));
      formData.append("countInStock", parseInt(editData.countInStock));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await productService.updateProduct(id, formData);
      setIsEditing(false);
      setImageFile(null);
      const updatedProduct = await productService.getProductById(id);
      setProduct(updatedProduct);
      alert("Product updated successfully");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await productService.deleteProduct(id);
      alert("Product deleted successfully");
      navigate("/inventory");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      countInStock: product.countInStock.toString(),
    });
    setImagePreview(product.image);
    setImageFile(null);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-container">
          <div className="loading">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-container">
          <div className="error-message">{error}</div>
          <Button onClick={() => navigate("/")}>Back to Products</Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const isOutOfStock = product.countInStock === 0;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <button className="back-button" onClick={() => navigate(isAdmin ? "/inventory" : "/")}>
          ← Back
        </button>

        <div className="product-detail-content">
          <div className="product-detail-image">
            {isEditing ? (
              <div className="edit-image-section">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-input"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" />
                )}
              </div>
            ) : product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </div>

          <div className="product-detail-info">
            {isEditing ? (
              <div className="edit-form">
                <div className="edit-field">
                  <Input
                    label="Product Name"
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="edit-field">
                  <Input
                    label="Price (₱)"
                    type="number"
                    name="price"
                    value={editData.price}
                    onChange={handleEditChange}
                    step="0.01"
                  />
                </div>
                <div className="edit-field">
                  <Input
                    label="Stock Count"
                    type="number"
                    name="countInStock"
                    value={editData.countInStock}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="edit-field">
                  <TextArea
                    label="Description"
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    rows={4}
                    placeholder="Product description..."
                  />
                </div>
                <div className="edit-actions">
                  <Button onClick={handleSaveEdit}>Save Changes</Button>
                  <Button onClick={handleCancelEdit} variant="secondary">Cancel</Button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="product-detail-name">{product.name}</h1>
                <div className="product-detail-price">₱{product.price.toFixed(2)}</div>

                <div className="product-detail-stock">
                  {isOutOfStock ? (
                    <span className="out-of-stock-badge">Out of Stock</span>
                  ) : (
                    <span className="in-stock-badge">
                      {product.countInStock} in stock
                    </span>
                  )}
                </div>

                {product.description && (
                  <div className="product-detail-description">
                    <h3>Description</h3>
                    <p>{product.description}</p>
                  </div>
                )}

                {isAdmin ? (
                  <div className="admin-actions">
                    <Button onClick={() => setIsEditing(true)}>Edit Product</Button>
                    <Button onClick={handleDelete} variant="danger">Delete Product</Button>
                  </div>
                ) : !isOutOfStock ? (
                  <div className="product-detail-actions">
                    <div className="quantity-selector">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.countInStock}
                      >
                        +
                      </button>
                    </div>

                    <Button
                      onClick={handleAddToCart}
                      className={`btn-add-cart ${addedToCart ? "added" : ""}`}
                    >
                      {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
                    </Button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
