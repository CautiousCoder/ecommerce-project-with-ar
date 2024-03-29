import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 5,
      max: 16,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: {
      type: Array,
      default: null,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
