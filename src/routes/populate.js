const { Router } = require("express");
const { populateDB } = require("../controllers/populate");

const router = Router();

router.get("/", populateDB);

module.exports = router;