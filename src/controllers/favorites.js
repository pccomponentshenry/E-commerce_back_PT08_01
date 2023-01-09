const { UserFavorite, Product, conn } = require('../db');

const getFavorites = async (req, res) => {
  const { userId } = req.params;

  const sqlQuery = `SELECT p.id FROM products AS p
  JOIN "userFavorites" AS uf ON p.id = uf."productId"
  WHERE uf."userId" = ${userId}`;

  try {
    const products = await conn.query(sqlQuery, {
      model: Product,
      mapToModel: true,
    });

    ;
    const favs = [...products.map(p => p.dataValues.id)];

    res.status(200).send(favs);
  }
  catch (error) {
    res.status(400).send(error);
  }
}

const putFavorites = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const favExists = await UserFavorite.findOne({ where: { userId, productId } });

    if (favExists) {
      await UserFavorite.destroy({ where: { userId, productId } });
      res.status(200).send({ favExists, added: false });
    }
    else {
      const newFav = await UserFavorite.create({ userId, productId });
      res.status(200).send({ newFav, added: true });
    }

  } catch (error) {
    res.status(400).send(error);
  }
}

const postFavorites = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const newFav = await UserFavorite.findOrCreate({ where: { userId, productId } });
    console.log('newFav', newFav);
    res.status(200).send({ newFav, added: true });
  }

  catch (error) {
    res.status(400).send(error);
  }

}

module.exports = { getFavorites, putFavorites, postFavorites };
