import Category from "../models/Category.js";

// get home data
export const getHomeData = async (req, res) => {
  try {
    const category = await Category.find().limit(12);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
