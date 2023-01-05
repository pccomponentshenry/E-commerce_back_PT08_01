const { Router } = require("express");
const { postProducts, getAllProducts, getProductById, getFilteredProducts, putProducts, deleteProduct, updateProductStock, getProductsByUser } = require("../controllers/product");

const router = Router();

router.get("/filter", getFilteredProducts);
router.get("/:id", getProductById);
router.get("/user/:id", getProductsByUser);
router.get("/", getAllProducts);
router.post("/", postProducts);
router.put("/:id", putProducts);
router.put("/stock/:userId", updateProductStock);
router.delete("/:id", deleteProduct);

module.exports = router;