import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["User", "Moderator", "Admin"],
      default: "User",
    },
  },
  { timestamps: true }
);

//middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //short circuiting, eliminates else statement
  this.password = await bcrypt.hash(this.password, 10); //salt value
});

export default mongoose.model("User", userSchema);
