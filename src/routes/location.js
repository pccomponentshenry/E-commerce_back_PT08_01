const { Router } = require("express");
const { getLocations } = require("../controllers/location");
const axios = require ('axios');
const { Location } = require('../db');


const router = Router();
async function preloadLocation() {
    let test = []; 
    if (test.length === 0) {
      axios
      .get('https://6389e394c5356b25a20ba4fa.mockapi.io/LOCATION')
      .then(data => {
         //console.log('holaaa', data.data)
         data.data.map(c => Location.create({
         name: c.name
        }))
       //await Promise.all(Location)
      })
      .then(console.log('Location loades.'))
      .catch(error => {
        console.log(error.message);
      });
    } 
  }
  preloadLocation();

router.get("/", getLocations);

module.exports = router;