const { Router } = require("express");
const { postProducts, getAllProducts, getProductById, getFilteredProducts, putProducts, deleteProduct } = require("../controllers/product");

const router = Router();

router.get("/filter", getFilteredProducts);
router.get("/:id", getProductById);
router.get("/", getAllProducts);
router.post("/", postProducts);
router.put("/:id", putProducts);
router.delete("/:id", deleteProduct);


module.exports = router;