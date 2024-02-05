import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: {
      type: String,
      default: null,
    },
    shortDes: {
      type: String,
      default: null,
    },
    category: String,
    rating: {
      type: Number,
      default: 0,
    },
    supply: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
