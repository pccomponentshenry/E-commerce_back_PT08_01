const { Router } = require("express");
const { handlePayment, createOrder, createOrderItem, changeOrderStatus, getOrders } = require("../controllers/order");

const router = Router();

router.get("/:userId", getOrders)
router.post("/checkout", handlePayment);
router.post("/item", createOrderItem);
router.post("/", createOrder);
router.put("/", changeOrderStatus);

module.exports = router;