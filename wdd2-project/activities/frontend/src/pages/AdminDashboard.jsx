import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import { useAuth } from "../contexts/AuthContext";
import { productService } from "../services/productService";
import "./AdminDashboard.css";

const truncateAtWord = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + "...";
  }
  return truncated + "...";
};

const DESCRIPTION_MAX = 80;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user || user.role !== "Admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await productService.getAllProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Product name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.countInStock)
      newErrors.countInStock = "Stock count is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", parseFloat(formData.price));
      productData.append("countInStock", parseInt(formData.countInStock));
      if (imageFile) {
        productData.append("image", imageFile);
      }

      if (editingId) {
        await productService.updateProduct(editingId, productData);
        alert("Product updated successfully");
      } else {
        await productService.createProduct(productData);
        alert("Product created successfully");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      countInStock: product.countInStock.toString(),
    });
    setImageFile(null);
    setImagePreview(product.image || null);
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await productService.deleteProduct(id);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      countInStock: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setShowForm(false);
    setErrors({});
  };

  return (
    <div>
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Collection Management</h1>
          <p>Manage the store's products</p>
        </div>

        <div className="dashboard-content">
          <div className="sidebar">
            <Button
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              className="btn-add-product"
            >
              {showForm ? "Cancel" : "+ Add New Product"}
            </Button>

            {showForm && (
              <div className="form-section">
                <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>
                <form
                  onSubmit={handleSubmit}
                  className="product-form"
                  encType="multipart/form-data"
                >
                  <Input
                    label="Product Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    required
                  />
                  <TextArea
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    error={errors.description}
                    placeholder="Product description..."
                  />
                  <Input
                    label="Price (₱)"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    error={errors.price}
                    step="0.01"
                    required
                  />
                  <div className="input-group">
                    <label className="input-label">Image</label>
                    <div className="image-upload">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="image-input"
                      />
                      {imagePreview && (
                        <div className="image-preview">
                          <img src={imagePreview} alt="Preview" />
                        </div>
                      )}
                    </div>
                  </div>
                  <Input
                    label="Stock Count"
                    type="number"
                    name="countInStock"
                    value={formData.countInStock}
                    onChange={handleInputChange}
                    error={errors.countInStock}
                    required
                  />
                  <button type="submit" className="btn-submit">
                    {editingId ? "Update Product" : "Create Product"}
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="products-section">
            {loading ? (
              <div className="loading">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="no-products">
                <p>No products yet. Add your first product!</p>
              </div>
            ) : (
              <div className="products-table-wrapper">
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <div className="product-info">
                            {product.image && (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="product-thumb"
                              />
                            )}
                            <span>{product.name}</span>
                          </div>
                        </td>
                        <td>₱{product.price.toFixed(2)}</td>
                        <td>
                          <span
                            className={`stock-badge ${
                              product.countInStock === 0 ? "out-of-stock" : ""
                            }`}
                          >
                            {product.countInStock}
                          </span>
                        </td>
                        <td>
                          <span className="description">
                            {truncateAtWord(
                              product.description,
                              DESCRIPTION_MAX,
                            )}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              onClick={() => handleEdit(product)}
                              className="btn-edit"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="btn-delete"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
