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

// get all post by category
export const getAllPostByCategory = async (req, res) => {
  // console.log(req.params);
  const { id } = req.query;
  try {
    const products = await Product.find({
      category: id,
    }).limit(50);
    // console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get a single post
export const getProduct = async (req, res) => {
  const { id } = req.query;
  // console.log("Product id", id);
  try {
    const product = await Product.find({
      _id: id,
    });
    const simillarProducts = await Product.find({
      category: product[0].category,
    }).limit(10);
    // console.log(simillarProducts);
    res.status(200).json({ product, simillarProducts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
