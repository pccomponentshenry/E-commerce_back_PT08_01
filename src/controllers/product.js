const { conn } = require('../db');
const { Product, Category, Brand } = require('../db');
const { insertIntoString } = require('../utils');
const jsonProducts = require("../json/all.json");

const populateProducts = async () => {
  for (p of jsonProducts) {
    const category = await Category.findOne({ where: { name: p.category } });
    const brand = await Brand.findOne({ where: { name: p.brand } });
    if (p.price !== 0)
      prod = await Product.create({ title: p?.title, img: p?.img, price: p?.price, description: p?.model, stock: Math.floor(Math.random() * 500), categoryId: category?.dataValues?.id, brandId: brand?.dataValues?.id })
  }
}

const allProductsDB = async () => {
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


const getAllProducts = async (req, res, next) => {

  const { name } = req.query;
  const products = await allProductsDB();
  try {
    if (name) {
      let productName = await products.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
      (productName.length > 0 ? res.json(productName) : res.status(404).json({ message: 'Product not found' }))
    } else {
      products.length > 0 ? res.json(products) : res.status(404).json({ message: 'No products' })
    };
  } catch (error) {
    next(error);
  }
  next();
}

const getProductById = async (req, res) => {

  const { id } = req.params;
  const products = await allProductsDB();
  try {
    products.forEach(el => {

      if (el.id == id) {
        res.json({
          id: el.id,
          title: el.title,
          img: el.img || el.img.forEach(i => { return i }),
          price: el.price,
          description: el.description,
          stock: el.stock,
          category: el.category.name,
          brand: el.brand.name,
          creator: el.creator

        })
      }
    })
  } catch (error) {
    res.status(404).send(error);
  }
}

const getFilteredProducts = async (req, res) => {

  const { category, brand, name } = req.query;
  let { min_price, max_price } = req.query;

  let sqlQuery =
    `SELECT p.id, p.title, p.img, p.price, p.description, p.stock, c.name AS category, b.name AS brand 
  FROM products AS p
  JOIN categories AS c ON p."categoryId" = c.id
  JOIN brand AS b ON p."brandId" = b.id
  WHERE p.price <> -1`;

  if (category) sqlQuery += ` AND c.id = ${category}`;

  if (brand) sqlQuery += ` AND b.id = ${brand}`;

  if (name) sqlQuery += ` AND p.title ILIKE '%${name}%'`;

  if (min_price || max_price) {
    if (!min_price) min_price = 0
    if (!max_price) max_price = 100000000;
    sqlQuery += ` AND p.price BETWEEN ${min_price} AND ${max_price}`;
  }

  try {
    const products = await conn.query(sqlQuery, {
      model: Product,
      mapToModel: true
    });
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send("No products found");
  }

}

const postProducts = async (req, res) => {
  const { name, brand, stock, price, description, img, category, creator } = req.body;
  try {
    const findBrand = await Brand.findOne({
      where: {
        name: brand,
      }
    })
    const findCategory = await Category.findOne({
      where: {
        name: category,
      }
    })
    await Product.create({
      title: name,
      img,
      price,
      description,
      stock,
      categoryId: findCategory.dataValues.id,
      brandId: findBrand.dataValues.id,
      creator,
    },
    )
    res.send('Product created successfully')

  } catch (error) {
    res.status(404).json({ "error": error.message })
  }
}

const putProducts = async (req, res) => {
  const { id } = req.params;
  const { name, brand, stock, price, description, img, category } = req.body;

  try {
    const findBrand = await Brand.findOne({
      where: {
        name: brand,
      }
    })
    const findCategory = await Category.findOne({
      where: {
        name: category,
      }
    })

    let forUpdate = await Product.findByPk(id);
    await forUpdate.update({
      title: name,
      stock,
      price,
      description,
      img,
      categoryId: findCategory.dataValues.id,
      brandId: findBrand.dataValues.id,
    });
    res.status(200).send("Product update successfully")
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = { populateProducts, getAllProducts, getProductById, getFilteredProducts, postProducts, putProducts };
