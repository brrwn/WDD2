const API_URL = "http://localhost:3000/api/orders";

export const orderService = {
  async createOrder(orderData) {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create order");
    }

    return data.order;
  },

  async getUserOrders() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/user/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    return data.orders || [];
  },

  async getOrderById(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch order");
    }

    return data.order;
  },

  async getAllOrders() {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }

    return data.orders || [];
  },

  async updateOrderStatus(id, statusData) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(statusData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update order");
    }

    return data.order;
  },
};
