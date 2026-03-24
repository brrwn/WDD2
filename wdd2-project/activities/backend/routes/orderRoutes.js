import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", verifyToken, createOrder);
router.get("/user/orders", verifyToken, getUserOrders);
router.get("/:id", verifyToken, getOrderById);

// Admin routes
router.get("/", verifyToken, verifyAdmin, getAllOrders);
router.put("/:id/status", verifyToken, verifyAdmin, updateOrderStatus);

export default router;
