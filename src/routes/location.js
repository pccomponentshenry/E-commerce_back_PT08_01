const { Router } = require("express");
const { getLocations } = require("../controllers/location");

const router = Router();

router.get("/", getLocations);

module.exports = router;