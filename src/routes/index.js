const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const brand = require("./brand.js");
const cart = require("./cart.js");
const cartItem = require("./cartItem.js");
const favorites = require("./favorites.js");
const category = require("./category.js");
const location = require("./location.js");
const product = require("./product.js");
const users = require("./users.js");
const populate = require("./populate.js");
const email = require("./email.js")
const order = require("./order.js")
const review = require("./review");
const address = require("./address");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/brands", brand);
router.use("/cart", cart);
router.use("/cartItem", cartItem);
router.use("/favorites", favorites);
router.use("/categories", category);
router.use("/locations", location);
router.use("/products", product);
router.use("/users", users);
router.use("/order", order);
router.use("/email", email)
router.use("/review", review);
router.use("/address", address);

router.use("/populateDB", populate);
module.exports = router;
