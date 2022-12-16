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
         // console.log(findProduct)
      await CartItem.create({
        productId: findProduct.dataValues.id
      },
      )
      res.send('CartItem created successfully')
  
    } catch (error) {
        
      res.status(404).json(error.message)
    }
  });
  router.put ( "/:id", async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
  //console.log(id, quantity)
    try {
     
      let forUpdate = await CartItem.findByPk(id);
      await forUpdate.update({
        quantity: quantity
      });
      res.status(200).send("Product update successfully")
    } catch (error) {
      res.status(400).send(error.message)
    }
  })

module.exports = router;