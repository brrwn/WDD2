const API_URL = "http://localhost:3000/api/products";
const BACKEND_URL = "http://localhost:3000";

const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  return `${BACKEND_URL}${imagePath}`;
};

export const productService = {
  async getAllProducts() {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch products");
    }

    const products = data.products || [];
    return products.map(product => ({
      ...product,
      image: getImageUrl(product.image)
    }));
  },

  async getProductById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch product");
    }

    return {
      ...data.product,
      image: getImageUrl(data.product.image)
    };
  },

  async createProduct(formData) {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create product");
    }

    return data.product;
  },

  async updateProduct(id, formData) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update product");
    }

    return data.product;
  },

  async deleteProduct(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete product");
    }

    return data;
  },
};
