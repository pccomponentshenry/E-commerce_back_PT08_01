const { Router } = require("express");
const { postProducts, getAllProducts, getProductById, getFilteredProducts, putProducts } = require("../controllers/product");

const router = Router();

router.get("/filter", getFilteredProducts);
router.get("/:id", getProductById);
router.get("/", getAllProducts);
router.post("/", postProducts);
<<<<<<< HEAD
router.put("/", putProducts)
=======
router.put("/", putProducts);
>>>>>>> 00569360516e5e1019dc0d66962ede8192334e44

module.exports = router;