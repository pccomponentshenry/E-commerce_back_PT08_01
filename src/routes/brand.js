//const axios = require("axios");
const { Router } = require("express");
const { getBrands } = require("../controllers/brand");

const router = Router();

router.get("/", getBrands);

module.exports = router;