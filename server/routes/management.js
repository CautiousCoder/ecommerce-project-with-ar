/*
 * Title: Management Routes
 *Description: Control and Manage Management Routes
 *Author : MD. ZAHIDUL ISLAM
 *Description:  01/12/2024 formate: mm/dd/YYYY
 */

import express from "express";
import { getAdmins, getUserPerformance } from "../controllers/management.js";

const router = express.Router();
router.get("/admins", getAdmins);
router.get("/performance/:id", getUserPerformance);

export default router;
