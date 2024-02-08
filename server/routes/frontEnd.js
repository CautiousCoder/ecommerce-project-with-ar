import express from "express";
import { getAllPostByCategory, getHomeData } from "../controllers/frontend.js";

const router = express.Router();

// home route
router.get("/home", getHomeData);

// get category by data
router.get("/home/category", getAllPostByCategory);

export default router;
