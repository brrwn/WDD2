import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { productService } from "../services/productService";
import { useAuth } from "../contexts/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const isAdmin = user?.role === "Admin";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await productService.getAllProducts();
        setProducts(fetchedProducts);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <Hero
        title={isAdmin ? "Behind the Scenes" : "Welcome to Filmhouse"}
        description={
          isAdmin
            ? "Monitor and manage the store's products"
            : "Discover our amazing collection of products"
        }
        buttontext={isAdmin ? "View Collection" : "Shop Now"}
        onButtonClick={
          isAdmin
            ? () =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
            : undefined
        }
      />

      <div id="products" className="products-section">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">
              {searchTerm
                ? "No products found matching your search."
                : "No products available."}
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
