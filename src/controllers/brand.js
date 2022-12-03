//const { Op } = require('sequelize');
const { Brand } = require('../db');
const axios = require ('axios');
const { sortArrayOfObjets } = require('../utils');

async function preloadBrands() {
 
    axios
    .get('https://6389e394c5356b25a20ba4fa.mockapi.io/brand')
    .then(data => {
      //console.log( data.data[0].results)
      data.data[0].results.map(c => Brand.create ({
       name: c.name
      }))
     // Brand.bulkCreate(bulk);
    })
    .then(console.log('Brand loades.'))
    .catch(error => {
      console.log(error.message);
    });
  
}
preloadBrands();

const getBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll({ raw: true });
    res.status(200).send(sortArrayOfObjets(brands, 'name'));
  } catch (error) {
    res.status(400).send(error);
  }
}
module.exports = { getBrands };