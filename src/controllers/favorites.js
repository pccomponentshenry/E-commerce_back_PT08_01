const { UserFavorite, Product, conn } = require('../db');

const getFavorites = async (req, res) => {
  const { userId } = req.params;

  const sqlQuery =
    `SELECT p.id, p.title, p.img, p.price, p.description, p.stock, c.name AS category, b.name AS brand
  FROM products AS p 
  JOIN "userFavorites" AS uf ON p.id = uf."productId"
  JOIN categories AS c ON p."categoryId" = c.id 
  JOIN brand AS b ON b.id = p."brandId"
  WHERE uf."userId" = ${userId}
  ORDER BY uf.id`;

  try {
    const products = await conn.query(sqlQuery, {
      model: Product,
      mapToModel: true,
    });

    res.status(200).send(products);
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
    res.status(200).send({ newFav, added: true });
  }

  catch (error) {
    res.status(400).send(error);
  }

}

module.exports = { getFavorites, putFavorites, postFavorites };
