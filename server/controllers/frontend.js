import Category from "../models/Category.js";
import Product from "../models/Product.js";

// get home data
export const getHomeData = async (req, res) => {
  try {
    const sort = { createdAt: -1 };
    const category = await Category.find().limit(12);
    const products = await Product.find().limit(12).sort(sort);
    // console.log("Requiested");
    res.status(200).json({ category, products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
