/*
 * Title: Simple Node Project using express, mongodb and etc.
 *Description: Create an admin dashboard which is use my own project
 *Author : MD. ZAHIDUL ISLAM
 *Description:  01/11/2024 formate: mm/dd/YYYY
 */

import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data inject

// import User from "./models/User.js";
// import { dataAffiliateStat } from "./.data/index.js";
// import Product from "./models/Product.js";
// import ProductStat from "./models/ProductStat.js";
// import Transactions from "./models/Transactions.js";
// import OverallStat from "./models/OverallStat.js";
// import AffiliateStat from "./models/AffiliateStat.js";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

const port = process.env.PORT || 9000;

// test route
app.get("/", (req, res) => {
  res.send("Home Route");
});

// Connect Mongo DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server runing on port ${port}`));

    //Data insert only one time
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transactions.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
  })
  .catch((err) => console.log(`Something wrong ${err}`));
