const { Op } = require('sequelize');
const { Location } = require('../db');
const { sortArrayOfObjets } = require('../utils');

const getLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({ raw: true });
    res.status(200).send(sortArrayOfObjets(locations, 'name'));
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { getLocations };