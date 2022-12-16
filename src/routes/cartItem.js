const { Router } = require("express");
const { postCartItem, modifyCartItem } = require("../controllers/cartItem");
const router = Router();
const { Product, CartItem } = require('../db')

router.post("/", postCartItem);
router.put("/:id", modifyCartItem);

module.exports = router;