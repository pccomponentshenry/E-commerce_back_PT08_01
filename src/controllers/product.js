const { conn } = require('../db');
const { Product, Category, Brand } = require('../db');
const { insertIntoString } = require('../utils');
const jsonProducts = require("../json/all.json");

const populateProducts = async () => {
  for (p of jsonProducts) {
    const category = await Category.findOne({ where: { name: p.category } });
    const brand = await Brand.findOne({ where: { name: p.brand } });
    prod = await Product.create({ title: p?.title, img: p?.img, price: p?.price, description: p?.model, stock: Math.floor(Math.random() * 500), categoryId: category?.dataValues?.id, brandId: brand?.dataValues?.id })
  }
}

const allProductDB = async () => {
  return await Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['name']
      },
      {
        model: Brand,
        attributes: ['name']
      },
    ]
  });
}

const getFilteredProducts = async (req, res) => {

  const { category, brand } = req.query;
  let { min_price, max_price } = req.query;

  let sqlQuery = 'SELECT p.id, p.title, p.img, p.price, p.description, p.stock FROM products AS p WHERE p.price <> -1';

  if (category) {
    sqlQuery = insertIntoString(sqlQuery, ', c.name AS category', 'FROM');
    sqlQuery = insertIntoString(sqlQuery, 'JOIN categories AS c ON p."categoryId" = c.id', 'WHERE');
    sqlQuery += ` AND c.id = ${category}`;
  }

  if (brand) {
    sqlQuery = insertIntoString(sqlQuery, ', b.name AS brand', 'FROM');
    sqlQuery = insertIntoString(sqlQuery, 'JOIN brand AS b ON p."brandId" = b.id', 'WHERE');
    sqlQuery += ` AND b.id = ${brand}`;
  }

  if (min_price || max_price) {
    if (!min_price) {
      min_price = 0
    };
    if (!max_price) {
      max_price = 100000000
    };

    sqlQuery += ` AND p.price BETWEEN ${min_price} AND ${max_price}`;
  }

  const products = await conn.query(sqlQuery, {
    model: Product,
    mapToModel: true
  });

  res.status(200).send(products);
}

module.exports = { populateProducts, allProductDB, getFilteredProducts };