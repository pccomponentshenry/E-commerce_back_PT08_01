const { Productreview } = require("../db");
const { Product } = require('../db');

const getReviews = async (req, res) => {
  try {
    const allReviews = await Productreview.findAll({
      raw: true,
      include: [
        {
          model: Product,
          attributes: ['id']
        }
      ]
    });
    res.status(200).json(allReviews);
  } catch (error) {
    res.status(400).json({ error: "No se encontraron comentarios del producto" });
  }
};

const getStarsPerProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Productreview.findAll({ where: { productId } });
    if (reviews.length) {
      const totalScore = reviews.reduce((acc, rev) => rev.dataValues.score + acc, 0);
      const avg = (totalScore / reviews.length).toFixed(2);
      return res.status(200).send({ avg: Number(avg) });
    }
    return res.status(200).send({ avg: 0 });
  } catch (error) {
    res.status(400).send(error);
  }
}

const postReview = async (req, res) => {
  const { title, message, score, id, picprofile, username } = req.body;
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
      picprofile,
      username,
      productId: findProduct.id
    },
    )
    res.send('Review created successfully')

  } catch (error) {
    res.status(404).json(error.message)
  }
};

module.exports = { getReviews, postReview, getStarsPerProduct }