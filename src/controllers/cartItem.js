const { Product, CartItem, Users } = require('../db');
//import {getProductById} from "../controllers/product"

const getCartItem = async (req, res) =>{
  const dbData = await CartItem.findAll({
    include: {
      model: Product,  //para que pueda hacer la relacion
      //attribute: ["name"],    
      through: {
        attributes: [],
      },
    },
  });
}

const postCartItem = async (req, res) => {
  const { title, quantity, email } = req.body;
  console.log(req.body)
  try {
    const findProduct = await Product.findOne({
      where: {
        title: title,
      }
    });
    const findUser = await Users.findOne({
      where:{
        email: email
      }
    })
    await CartItem.create({
      productId: findProduct.dataValues.id,
      userId: findUser.dataValues.id,
      quantity
    });
    res.send('CartItem created successfully')
  }
  catch (error) {
   console.log(error.message);
  }
};

const modifyCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    let forUpdate = await CartItem.findByPk(id);
    await forUpdate.update({
      quantity: quantity
    });
    res.status(200).send("Product update successfully")
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = { postCartItem, modifyCartItem, getCartItem };