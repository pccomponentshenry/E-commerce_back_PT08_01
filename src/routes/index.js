const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const brand = require("./brand.js")
const cart = require("./cart.js")
const cartItem = require("./cartItem.js")

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//probando el pullRequest  
router.use("/brand", brand)
router.use("/cart", cart)
router.use("/cartItem", cartItem)


module.exports = router;
