import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post("/", verifyToken, verifyAdmin, upload.single("image"), createProduct);
router.put("/:id", verifyToken, verifyAdmin, upload.single("image"), updateProduct);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

export default router;
