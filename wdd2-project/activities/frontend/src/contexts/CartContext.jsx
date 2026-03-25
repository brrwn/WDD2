import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { cartService } from "../services/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  const loadCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      const dbCart = await cartService.getCart();
      setCart(dbCart || []);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const syncAddToCart = async (product, quantity = 1) => {
    if (!isAuthenticated) {
      return;
    }

    try {
      const updatedCart = await cartService.addToCart(product._id, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const syncRemoveFromCart = async (productId) => {
    if (!isAuthenticated) {
      return;
    }

    try {
      const updatedCart = await cartService.removeFromCart(productId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const syncUpdateQuantity = async (productId, quantity) => {
    if (!isAuthenticated) {
      return;
    }

    try {
      const updatedCart = await cartService.updateCartItem(productId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const syncClearCart = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await cartService.clearCart();
      setCart([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productId === product._id
      );

      if (existingItem) {
        const updatedCart = prevCart.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        if (isAuthenticated) {
          syncUpdateQuantity(product._id, existingItem.quantity + quantity);
        }
        return updatedCart;
      } else {
        const newItem = {
          productId: product._id,
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          countInStock: product.countInStock,
          quantity,
        };
        if (isAuthenticated) {
          syncAddToCart(product, quantity);
        }
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    if (isAuthenticated) {
      syncRemoveFromCart(productId);
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
    if (isAuthenticated) {
      syncUpdateQuantity(productId, quantity);
    }
  };

  const clearCart = () => {
    setCart([]);
    if (isAuthenticated) {
      syncClearCart();
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
