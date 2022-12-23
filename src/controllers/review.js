const { Productreview } = require("../db");
const { Product} = require('../db');

const getReviews = async (req, res) => {
    try {
      const allReviews = await Productreview.findAll({
        raw: true,
        include:[
          {
            model:Product,
            attributes:['id']
          }
        ]
      });
      res.status(200).json(allReviews);
    } catch (error) {
      res.status(400).json({ error: "No se encontraron comentarios del producto" });
    }
};

const postReview = async (req, res) => {
    const { title, message, score,id} = req.body;
    try {
      const findProduct = await Product.findOne({
        where: {
          id: id
        }
      })
      await Productreview.create({
        title,
        message,
        score,
        productId: findProduct.id
      },
      )
      res.send('Review created successfully')
  
    } catch (error) {
      res.status(404).json(error.message)
    }
};
  
  module.exports = { getReviews, postReview }