const { conn } = require("../db");
const { Product, Category, Brand, Users, Order, OrderItem } = require("../db");
const jsonProducts = require("../json/all.json");

const populateProducts = async () => {
  for (p of jsonProducts) {
    const category = await Category.findOne({ where: { name: p.category } });
    const brand = await Brand.findOne({ where: { name: p.brand } });
    if (p.price !== 0)
      prod = await Product.create({
        title: p?.title,
        img: p?.img,
        price: p?.price,
        description: p?.model,
        stock: Math.floor(Math.random() * 500),
        categoryId: category?.dataValues?.id,
        brandId: brand?.dataValues?.id,
        userId: 1,
      });
  }
};

const allProductsDB = async () => {
  return await Product.findAll({
    include: [
      {
        model: Category,
        attributes: ["name"],
      },
      {
        model: Brand,
        attributes: ["name"],
      },
      { model: Users, attributes: ["email"] },
    ],
  });
};

const getAllProducts = async (req, res, next) => {
  const { name } = req.query;
  const products = await allProductsDB();
  try {
    if (name) {
      let productName = await products.filter(e =>
        e.title.toLowerCase().includes(name.toLowerCase())
      );
      productName.length > 0
        ? res.json(productName)
        : res.status(404).json({ message: "Product not found" });
    } else {
      products.length > 0
        ? res.json(products)
        : res.status(404).json({ message: "No products" });
    }
  } catch (error) {
    next(error);
  }
  next();
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id,
      {
        include: {
          model: Users
        }
      });

    res.status(200).send(product);
  } catch (error) {
    res.status(404).send(error);
  }
};

const getProductsByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.findAll(
      {
        where: {
          userId: id
        },
        include: [
          {
            model: Category,
            attributes: ["name"],
          },
          {
            model: Brand,
            attributes: ["name"],
          }
        ],
      });
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
}

const getFilteredProducts = async (req, res) => {
  const { category, brand, name } = req.query;
  let { min_price, max_price } = req.query;

  let sqlQuery = `SELECT p.id, p.title, p.img, p.price, p.description, p.stock, p.status, c.name AS category, b.name AS brand 
  FROM products AS p
  JOIN categories AS c ON p."categoryId" = c.id
  JOIN brand AS b ON p."brandId" = b.id
  WHERE p.price <> -1`;

  if (category) sqlQuery += ` AND c.id = ${category}`;

  if (brand) sqlQuery += ` AND b.id = ${brand}`;

  if (name) sqlQuery += ` AND p.title ILIKE '%${name}%'`;

  if (min_price || max_price) {
    if (!min_price) min_price = 0;
    if (!max_price) max_price = 100000000;
    sqlQuery += ` AND p.price BETWEEN ${min_price} AND ${max_price}`;
  }

  try {
    const products = await conn.query(sqlQuery, {
      model: Product,
      mapToModel: true,
    });
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send("No products found");
  }
};

const postProducts = async (req, res) => {
  const { title, brand, stock, price, description, img, category, userId } = req.body;

  try {
    const findBrand = await Brand.findOne({
      where: {
        name: brand,
      },
    });

    const findCategory = await Category.findOne({
      where: {
        name: category,
      },
    });

    const product = await Product.create({
      title,
      img,
      price,
      description,
      stock,
      categoryId: findCategory.dataValues.id,
      brandId: findBrand.dataValues.id,
      userId,
    });

    res.send(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const putProducts = async (req, res) => {
  const { id } = req.params;
  const { brand, category } = req.body;

  try {

    const updateParams = {};

    for (item in req.body) {
      if (req.body[item] && req.body[item]?.length) {
        updateParams[item] = req.body[item];
      }
    }

    const findBrand = await Brand.findOne({
      where: {
        name: brand,
      },
    });

    const findCategory = await Category.findOne({
      where: {
        name: category,
      },
    });

    if (findBrand) {
      updateParams.brandId = findBrand.dataValues.id;
    }
    if (findCategory) {
      updateParams.categoryId = findCategory.dataValues.id;
    }

    const forUpdate = await Product.findByPk(id);
    await forUpdate.update(updateParams);

    res.status(200).send("Product updated successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const changeProductStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const product = await Product.update({ status }, { where: { id } });
    res.status(200).send(`Product ${status} successfully`);
  } catch (error) {
    res.status(400).send(error);
  }
}

const updateProductStock = async (req, res) => {
  const { userId } = req.params;

  try {
    const order = await Order.findOne({
      where: {
        userId,
        status: "created"
      },
      raw: true
    });

    const orderItems = await OrderItem.findAll({
      where: {
        orderId: order.id
      },
      raw: true
    });

    for (let i = 0; i < orderItems.length; i++) {
      const id = orderItems[i].productId;
      const product = await Product.findByPk(id, { raw: true });
      const newStock = product.stock - orderItems[i].quantity > 0
        ? product.stock - orderItems[i].quantity
        : 0;

      const whereParams = { id };

      if (!newStock) {
        whereParams.status = "inactive";
      }

      await Product.update(
        {
          stock: newStock
        },
        {
          where: whereParams
        }
      );
    }
    res.status(200).send("Stock updated");
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  populateProducts,
  getAllProducts,
  getProductById,
  getFilteredProducts,
  postProducts,
  putProducts,
  changeProductStatus,
  updateProductStock,
  getProductsByUser
};
