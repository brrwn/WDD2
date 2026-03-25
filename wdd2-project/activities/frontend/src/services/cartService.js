import { authService } from "./authService";

const API_URL = "http://localhost:3000/api/cart";

const getAuthHeaders = () => {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const cartService = {
  async getCart() {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch cart");
    }

    return data;
  },

  async addToCart(productId, quantity = 1) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add to cart");
    }

    return data;
  },

  async updateCartItem(productId, quantity) {
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update cart");
    }

    return data;
  },

  async removeFromCart(productId) {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to remove from cart");
    }

    return data;
  },

  async clearCart() {
    const response = await fetch(API_URL, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to clear cart");
    }

    return data;
  },
};
