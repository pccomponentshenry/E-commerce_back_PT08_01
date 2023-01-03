const { Router } = require("express");
const {
  getAddresses,
  postAddress,
  modifyAddress,
  getAddressById,
  deleteAddress
} = require("../controllers/address");

const router = Router();

router.get("/:userId", getAddresses);
router.get("/:userId/:id", getAddressById);
router.post("/", postAddress);
router.put("/:id", deleteAddress);
router.put("/", modifyAddress);

module.exports = router;
