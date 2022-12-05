const { Router } = require("express");
const { postProducts, getAllProducts, getProductById, getFilteredProducts } = require("../controllers/product");

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/filter", getFilteredProducts);
router.post("/", postProducts);

module.exports = router;