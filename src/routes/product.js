const { Router } = require("express");
const { Product, Category, Brand } = require('../db');
const router = Router();

const allProductDB = async () => {
    return await Product.findAll({
        include: [
         { model: Category },
         { model: Brand}
        ]
    });
}

router.get('/', async (req, res, next) => {
    let { name } = req.query;
    const products = await allProductDB()
    try {
        if (name) {
            let productName = await products.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            (productName.length > 0 ? res.json(productName) : res.status(404).json({ message: 'Producto no encontrado'}))
        } else {
            products.length > 0 ? res.json(products) : res.status(404).json({ message: 'No hay productos'})
        };
} catch (error) {
  next(error);
}
});

module.exports = router;