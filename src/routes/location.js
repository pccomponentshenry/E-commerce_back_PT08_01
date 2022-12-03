const { Router } = require("express");
const { getLocations } = require("../controllers/location");
const axios = require('axios');
const { Location } = require('../db');

const router = Router();

router.get("/", getLocations);

module.exports = router;