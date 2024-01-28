/*
 * Title: Sales Routes
 *Description: Control and Manage Sales Routes
 *Author : MD. ZAHIDUL ISLAM
 *Description:  01/12/2024 formate: mm/dd/YYYY
 */

import express from "express";
import { getSales } from "../controllers/sales.js";

const router = express.Router();

// sales overview
router.get("/overview", getSales);

export default router;
