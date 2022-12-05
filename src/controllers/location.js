const { Location } = require('../db');
const { sortArrayOfObjets, sortArray } = require('../utils');
const jsonLocations = require("../json/locations.json");

const populateLocations = async () => {
  let locations = [];
  for (l of jsonLocations) {
    if (l.categoria === "Provincia") {
      locations.push(l.iso_nombre);
    }
  }
  sortArray(locations);
  for (l of locations) {
    await Location.findOrCreate({
      where:{ name: l }
  });
  }
}

const getLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({ raw: true });
    res.status(200).send(sortArrayOfObjets(locations, 'name'));
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { getLocations, populateLocations };