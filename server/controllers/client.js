import getCountryISO3 from "country-iso-2-to-3";
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
