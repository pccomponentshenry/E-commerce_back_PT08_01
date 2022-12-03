const { Router } = require("express");
const { populateBrands } = require("../controllers/brand");
const { populateCategories } = require("../controllers/category");
const { populateProducts, allProductDB } = require("../controllers/product");

const router = Router();



router.get('/', async (req, res, next) => {
    await populateBrands();
    await populateCategories();
    await populateProducts();
    let { name } = req.query;
    const products = await allProductDB()
    try {
        if (name) {
            let productName = await products.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
            (productName.length > 0 ? res.json(productName) : res.status(404).json({ message: 'Producto no encontrado' }))
        } else {
            products.length > 0 ? res.json(products) : res.status(404).json({ message: 'No hay productos' })
        };
    } catch (error) {
        next(error);
    }
    next();
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
                    img: el.img || el.img.forEach(i => { return i }),
                    price: el.price,
                    description: el.description,
                    stock: el.stock,
                    category: el.category.name,
                    brand: el.brand.name
                })
            }
        })
    } catch (error) {
        res.status(404).send(error);
    }

});


module.exports = router;