const { Router } = require("express");
const { populateBrands } = require("../controllers/brand");
const { populateCategories } = require("../controllers/category");
const { populateProducts, allProductDB } = require("../controllers/product");

const router = Router();
const axios = require ('axios');

async function preloadProducts() {
    
      axios
      .get('https://6389e394c5356b25a20ba4fa.mockapi.io/products')
      .then(data => {
         //console.log('holaaa', data.data)
         data.data.map(c => Product.create({
         title: c.title,
         img: c.img,
         price: c.price,
         stock: c.stock,
         description: c.description, 

        })
        )
      })
      .then(console.log('Products loades.'))
      .catch(error => {
        console.log(error.message);
      });
    
  }
  preloadProducts();

router.get('/populate', async (req, res) => {
    try {
        await populateCategories();
        await populateBrands();
        await populateProducts();
        res.status(200).send({ message: 'Database populated!' })
    } catch (error) {
        res.status(400).send({ message: error })
    }
});

router.get('/', async (req, res, next) => {
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