const { Router } = require("express");
const { postCartItem, modifyCartItem, getCartItem, removeAllFromCart } = require("../controllers/cartItem");
const router = Router();

router.get("/:email", getCartItem);
router.post("/", postCartItem);
router.put("/:email", removeAllFromCart);

module.exports = router;