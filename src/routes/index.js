const { Router } = require("express");
const { populateLocations } = require("../controllers/location.js");
const { populateCategories } = require("../controllers/category.js");
const { populateBrands } = require("../controllers/brand.js");
const { populateProducts } = require("../controllers/product.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const brand = require("./brand.js");
const cart = require("./cart.js");
const cartItem = require("./cartItem.js");
const category = require("./category.js");
const location = require("./location.js");
const product = require("./product.js");
const users = require("./users.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/brands", brand);
router.use("/cart", cart);
router.use("/cartItem", cartItem);
router.use("/categories", category);
router.use("/locations", location);
router.use("/products", product);
router.use("/users", users);

router.get('/populate', async (req, res) => {
  try {
    await populateLocations();
    await populateCategories();
    await populateBrands();
    await populateProducts();
    res.status(200).send({ message: 'Database populated!' })
  } catch (error) {
    res.status(400).send({ message: error })
  }
});

module.exports = router;
