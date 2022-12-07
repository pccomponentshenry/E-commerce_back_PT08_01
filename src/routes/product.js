const { Router } = require("express");
const { postProducts, getAllProducts, getProductById, getFilteredProducts, putProducts } = require("../controllers/product");

const router = Router();

router.get("/filter", getFilteredProducts);
router.get("/:id", getProductById);
router.get("/", getAllProducts);
router.post("/", postProducts);
router.put("/:id", putProducts);


module.exports = router;