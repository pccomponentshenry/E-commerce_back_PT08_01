const { Router } = require("express");
const { getCategories } = require("../controllers/category");
const axios = require ('axios');
const router = Router();
const { Category } = require('../db');

async function preloadCategory() {
    
      axios
      .get('https://6389e394c5356b25a20ba4fa.mockapi.io/category')
      .then(data => {
         //console.log('holaaa', data.data)
         data.data.map(c => Category.create({
         name: c.name
        }))
       //await Promise.all(Location)
      })
      .then(console.log('Categories loades.'))
      .catch(error => {
        console.log(error.message);
      });
    
  }
  preloadCategory();

router.get("/", getCategories);

module.exports = router;