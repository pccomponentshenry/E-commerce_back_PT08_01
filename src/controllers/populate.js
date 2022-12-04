const { populateBrands } = require("./brand");
const { populateCategories } = require("./category");
const { populateLocations } = require("./location");
const { populateProducts } = require("./product");
const { Product } = require('../db');

const populateDB = async (req, res) => {
  try {
    const count = await Product.count();
    if (!count) {
      await populateBrands();
      await populateCategories();
      await populateLocations();
      await populateProducts();
      return res.status(200).send("Database populated");
    }
    res.status(200).send("Database already populated");
  } catch (error) {
    res.status(400).send("Database error: ", error);
  }
}

module.exports = { populateDB };