const { Op } = require('sequelize');
const { Brand } = require('../db');
const { sortArrayOfObjets } = require('../utils');

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll({ raw: true });
    res.status(200).send(sortArrayOfObjets(brands, 'name'));
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { getBrands };