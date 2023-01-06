const { Router } = require("express");
const { handlePayment, createOrder, createOrderItem, changeOrderStatus, getOrders, getSoldProducts, getAllOrders } = require("../controllers/order");

const router = Router();
router.get("/products", getSoldProducts);
router.get("/:userId", getOrders);
router.get("/", getAllOrders)
router.post("/checkout", handlePayment);
router.post("/item", createOrderItem);
router.post("/", createOrder);
router.put("/", changeOrderStatus);


module.exports = router;