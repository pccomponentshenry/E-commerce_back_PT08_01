const { Router } = require("express");
const { handlePayment } = require("../controllers/payment");

const router = Router();

router.post("/checkout", handlePayment);

module.exports = router;