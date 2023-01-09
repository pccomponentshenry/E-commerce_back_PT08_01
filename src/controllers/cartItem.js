const { Product, CartItem, Users, conn } = require('../db');

const getCartItem = async (req, res) => {
  const { email } = req.params;

  const sqlQuery =
    `SELECT p.id, p.title, p.img, p.price, p.description, p.stock, c.name AS category, b.name AS brand, ci.quantity
    FROM products AS p 
    JOIN "cartItems" AS ci ON p.id = ci."productId" 
    JOIN users AS u ON u.id = ci."userId" 
    JOIN categories AS c ON p."categoryId" = c.id 
    JOIN brand AS b ON b.id = p."brandId"
    WHERE u.email = '${email}'`;

  try {
    const products = await conn.query(sqlQuery,
      {
        model: Product,
        mapToModel: true
      },
      {
        raw: true
      });
    res.status(200).send(products);
  }
  catch (error) {
    res.status(400).send(error);
  }
}

const removeAllFromCart = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await Users.findOne({ where: { email } });

    await CartItem.destroy({
      where: {
        userId: user.dataValues.id
      }
    })
    res.status(200).send(`Cart successfully deleted for user ${email}`);
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}

const postCartItem = async (req, res) => {
  const { id, quantity, email, add } = req.body;

  try {
    const product = await Product.findByPk(id);
    const user = await Users.findOne({
      where: {
        email: email
      }
    });
    const cartItem = await CartItem.findOne({
      where: {
        userId: user.dataValues.id,
        productId: product.dataValues.id
      },
      raw: true
    });

    if (cartItem) {
      const quant = add ? cartItem.quantity + quantity : cartItem.quantity - quantity;

      if (quant) {
        await CartItem.update({ quantity: quant }, {
          where: {
            productId: product.dataValues.id,
            userId: user.dataValues.id
          }
        });
      }
      else {
        await CartItem.destroy({
          where: {
            userId: user.dataValues.id,
            productId: product.dataValues.id
          }
        })
      }

    }
    else {
      const newCartItem = await CartItem.create({
        productId: product.dataValues.id,
        userId: user.dataValues.id,
        quantity
      });

    }
    res.send(product)
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

module.exports = { postCartItem, removeAllFromCart, getCartItem };