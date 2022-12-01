const { Op } = require('sequelize');
const { Category } = require('../db');
const { sortArrayOfObjets } = require('../utils');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ raw: true });
    res.status(200).send(sortArrayOfObjets(categories, 'name'));
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { getCategories };