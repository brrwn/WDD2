import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";

const app = express();
const PORT = 3000;
dotenv.config();

//get - display name, var name = "bjorn"
//post - logic, if username = "bjorn", password = "123", success else failed

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
//http://localhost:3000/api/auth/register
//http://localhost:3000/api/auth/login
//http://localhost:3000/api/auth/logout

// app.get("/getName", (req, res) => {
//   var name = "Bjorn";
//   res.status(200).json(name);
// });

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   if (username == "Bjorn" && password == "pass123") {
//     res.status(200).json({
//       message: "Login Successful.",
//       status: "success",
//     });
//   } else {
//     res.status(403).json({
//       message: "Invalid username or password.",
//       status: "failed",
//     });
//   }
// });

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on PORT: ${PORT}`);
});
