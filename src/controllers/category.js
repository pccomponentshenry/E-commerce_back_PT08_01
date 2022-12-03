const { Op } = require('sequelize');
const { Category } = require('../db');
const { sortArrayOfObjets } = require('../utils');
const jsonProducts = require("../json/all.json");

const populateCategories = async () => {
  let categories = [];
  for (p of jsonProducts) {
    if (!categories.includes(p.category)) {
      categories.push(p.category);
    }
  }
  for (c of categories) {
    await Category.create({ name: c });
  }
}

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ raw: true });
    res.status(200).send(sortArrayOfObjets(categories, 'name'));
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { getCategories, populateCategories };