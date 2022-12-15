const { Router } = require("express");
const router = Router();
const {Product, CartItem} = require ('../db')

router.post("/", async (req, res) => {
    const { name } = req.body;
    try {
        const findProduct = await Product.findOne({
            where: {
              title: name,
            }
          })
          console.log(findProduct)
      await CartItem.create({
        productId: findProduct.dataValues.id
      },
      )
      res.send('CartItem created successfully')
  
    } catch (error) {
        
      res.status(404).json(error.message)
    }
  });

module.exports = router;