import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    max: 60,
  },
  description: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  productId: [
    {
      type: String,
      default: null,
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
