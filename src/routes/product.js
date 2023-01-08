const { Router } = require("express");
const { postProducts, getAllProducts, getProductById, getFilteredProducts, putProducts, updateProductStock, getProductsByUser, changeProductStatus } = require("../controllers/product");

const router = Router();

router.get("/filter", getFilteredProducts);
router.get("/:id", getProductById);
router.get("/user/:id", getProductsByUser);
router.get("/", getAllProducts);
router.post("/", postProducts);
router.put("/status", changeProductStatus);
router.put("/:id", putProducts);
router.put("/stock/:userId", updateProductStock);

module.exports = router;