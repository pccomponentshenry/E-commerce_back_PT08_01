const { Router } = require("express");
const { Product, Category, Brand } = require('../db');
const router = Router();

const allProductDB = async () => {
    return await Product.findAll({
        include: [
         { model: Category,
           attributes: ['name'] },
         { model: Brand,
           attributes: ['name']},
        ]
    });
}

router.get('/', async (req, res, next) => {
    let { name } = req.query;
    const products = await allProductDB()
    try {
        if (name) {
            let productName = await products.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
            (productName.length > 0 ? res.json(productName) : res.status(404).json({ message: 'Producto no encontrado'}))
        } else {
            products.length > 0 ? res.json(products) : res.status(404).json({ message: 'No hay productos'})
        };
} catch (error) {
  next(error);
}
});

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    const products = await allProductDB()
    try {
        products.forEach(el => {
        if (el.id == id) {
            res.json({
                id: el.id,
                title: el.title,
                img: el.img || el.img.forEach(i =>{return i}),
                price: el.price,
                description: el.description,
                stock: el.stock,
                category:el.category.name,
                brand:el.brand.name
            })
          }
        })
    } catch (error) {
        res.status(404).send(error);
    }

});

module.exports = router;