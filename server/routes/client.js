/*
 * Title: Client Routes
 *Description: Control and Manage Client Routes
 *Author : MD. ZAHIDUL ISLAM
 *Description:  01/12/2024 formate: mm/dd/YYYY
 */
import express from "express";

import {
  addCategory,
  getCustomers,
  getGeography,
  getProdects,
  getTransactions,
  upload,
} from "../controllers/client.js";

const router = express.Router();

//get Product
router.get("/products", getProdects);

// post category
router.post("/products/category/add", upload.single("file"), addCategory);

// for get user
router.get("/customers", getCustomers);

// for get user Transactions
router.get("/transactions", getTransactions);

// for get user location
router.get("/geography", getGeography);

export default router;
