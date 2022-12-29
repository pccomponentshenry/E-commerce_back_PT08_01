const { Router } = require("express");
const {
  getAddresses,
  postAddress,
  modifyAddress,
} = require("../controllers/address");

const router = Router();

router.get("/:userId", getAddresses);
router.post("/", postAddress);
router.put("/", modifyAddress);

module.exports = router;
