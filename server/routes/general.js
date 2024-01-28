/*
 * Title: General Routes
 *Description: Control and Manage General Routes
 *Author : MD. ZAHIDUL ISLAM
 *Description:  01/12/2024 formate: mm/dd/YYYY
 */

import express from "express";
import { getDashboard, getUser } from "../controllers/general.js";

const router = express.Router();
// find every single user
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboard);

export default router;
