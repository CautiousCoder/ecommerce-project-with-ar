import express from "express";
import {
  getAllPostByCategory,
  getHomeData,
  getProduct,
} from "../controllers/frontend.js";

const router = express.Router();

// home route
router.get("/home", getHomeData);

// get category by data
router.get("/home/category", getAllPostByCategory);

// get s single post data
router.get("/home/product", getProduct);

export default router;
