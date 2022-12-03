const { Router } = require("express");
const { getCategories } = require("../controllers/category");
const axios = require('axios');
const router = Router();
const { Category } = require('../db');

router.get("/", getCategories);

module.exports = router;