const { Product, Category, Brand } = require('../db');
const jsonProducts = require("../json/all.json");
const { populateBrands } = require('./brand');
const { populateCategories } = require('./category');

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

module.exports = { populateProducts, allProductDB };