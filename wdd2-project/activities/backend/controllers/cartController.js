import User from "../models/User.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.cart || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingItemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      user.cart.push({
        productId: product._id,
        quantity,
        name: product.name,
        price: product.price,
        image: product.image,
        countInStock: product.countInStock,
      });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      user.cart.splice(itemIndex, 1);
    } else {
      user.cart[itemIndex].quantity = quantity;
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = [];
    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
