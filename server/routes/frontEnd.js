import express from "express";
import { getHomeData } from "../controllers/frontend.js";

const router = express.Router();

// home route
router.get("/home", getHomeData);

export default router;
