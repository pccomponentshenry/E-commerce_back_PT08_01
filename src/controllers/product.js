const { Product, Category, Brand } = require('../db');
const jsonProducts = require("../json/all.json");

const populateCategories = async () => {
  await Category.create({ name: 'Case Fan' });
  await Category.create({ name: 'Case' });
  await Category.create({ name: 'CPU Fan' });
  await Category.create({ name: 'GPU' });
  await Category.create({ name: 'Keyboard' });
  await Category.create({ name: 'Motherboard' });
  await Category.create({ name: 'Mouse' });
  await Category.create({ name: 'Processor' });
  await Category.create({ name: 'RAM' });
  await Category.create({ name: 'Storage' });
}

const populateBrands = async () => {
  let brands = [];
  for (p of jsonProducts) {
    if (!brands.includes(p.brand)) {
      brands.push(p.brand);
    }
  }
  for (b of brands) {
    await Brand.create({ name: b });
  }
}

const populateProducts = async () => {
  for (p of jsonProducts) {
    const category = await Category.findOne({ where: { name: p.category } });
    const brand = await Brand.findOne({ where: { name: p.brand } });
    prod = await Product.create({ title: p?.title, img: p?.img, price: p?.price, description: p?.model, stock: Math.floor(Math.random() * 500), categoryId: category?.dataValues?.id, brandId: brand?.dataValues?.id })
  }
}

const populateDB = async () => {
  await populateCategories();
  await populateBrands();
  await populateProducts();
}

module.exports = populateDB;