import getCountryISO3 from "country-iso-2-to-3";
import multer from "multer";
import path from "path";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

// for get products
export const getProdects = async (req, res) => {
  try {
    const products = await Product.find();
    // find corresponding product details
    const productWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// product image upload
// use midleware
const ProductStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/post");
  },
  filename: (req, file, cb) =>
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    ),
});
export const ProductImageUpload = multer({
  storage: ProductStorage,
});

// for post product
export const addProduct = async (req, res) => {
  Product.create({
    name: req.body.name,
    description: req.body.description,
    shortDes: req.body.shortDes,
    price: req.body.price,
    supply: req.body.supply,
    category: req.body.category,
    img: req.file.filename,
  })
    .then((product) => console.log("Product Add Successfully."))
    .catch((err) => console.log("Err", err));
};

// get category
export const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// category added
// use midleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/category");
  },
  filename: (req, file, cb) =>
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    ),
});
export const upload = multer({
  storage: storage,
});

export const addCategory = (req, res) => {
  Category.create({
    name: req.body.name,
    description: req.body.description,
    image: req.file.filename,
  })
    .then((category) => console.log("Category Add Successfully."))
    .catch((err) => console.log("Err", err));
};

// for get customers
export const getCustomers = async (reg, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// for ger customers transactions
export const getTransactions = async (req, res) => {
  try {
    // frontend user sort look like this: {"field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    //formatted sort should look like this: { userId: -1 } object
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    // get transactions
    console.log("search sort formate", sortFormatted);
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    // total documents
    const total = await Transaction.countDocuments({
      userId: { $regex: search, $options: "i" },
    });
    res.status(200).json({ transactions, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// for get user location
export const getGeography = async (req, res) => {
  try {
    const users = User.find();

    // user location
    const mappedLocations = (await users).reduce((acc, { country }) => {
      const countryIso3 = getCountryISO3(country);
      if (!acc[countryIso3]) {
        acc[countryIso3] = 0;
      }
      acc[countryIso3]++; // # of user in particular country
      return acc;
    }, {});

    // formatted location should look like {id: id, Value: value}
    const formatedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formatedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
