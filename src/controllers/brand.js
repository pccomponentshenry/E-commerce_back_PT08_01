const { Brand } = require('../db');
const { sortArrayOfObjets, sortArray } = require('../utils');
const jsonProducts = require("../json/all.json");

const populateBrands = async () => {
  let brands = [];
  for (p of jsonProducts) {
    if (!brands.includes(p.brand)) {
      brands.push(p.brand);
    }
  }
  sortArray(brands);
  for (b of brands) {
    await Brand.create({ name: b });
  }
}

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll({ raw: true });
    res.status(200).send(sortArrayOfObjets(brands, 'name'));
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { getBrands, populateBrands };