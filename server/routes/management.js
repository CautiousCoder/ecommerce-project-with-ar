/*
 * Title: Management Routes
 *Description: Control and Manage Management Routes
 *Author : MD. ZAHIDUL ISLAM
 *Description:  01/12/2024 formate: mm/dd/YYYY
 */

import express from "express";
import {
  getAdmins,
  getUserPerformance,
  sendUserData,
} from "../controllers/management.js";

const router = express.Router();
router.get("/users", getAdmins);
router.get("/performance/:id", getUserPerformance);

// add users
router.post("/users/add", sendUserData);

export default router;
