import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  name: String,
  price: Number,
  image: String,
  countInStock: Number,
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    cart: [cartItemSchema],
  },
  { timestamps: true },
);

//middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //short circuiting, eliminates else statement
  this.password = await bcrypt.hash(this.password, 10); //salt value
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
