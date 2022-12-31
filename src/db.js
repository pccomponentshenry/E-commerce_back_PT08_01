require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    file =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Brand, Cart, CartItem, Category, Location, Product, Users, UserFavorite, Address, Order, OrderItem, Productreview, Userreview } =
  sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Category.hasMany(Product);
Product.belongsTo(Category);

Brand.hasMany(Product);
Product.belongsTo(Brand);

Users.hasMany(Product);
Product.belongsTo(Users);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);
Users.hasMany(CartItem);
CartItem.belongsTo(Users);

Product.hasMany(UserFavorite);
UserFavorite.belongsTo(Product);
Users.hasMany(UserFavorite);
UserFavorite.belongsTo(Users);

Users.hasMany(Address);
Address.belongsTo(Users);
Location.hasMany(Address);
Address.belongsTo(Location);

Users.hasMany(Order);
Order.belongsTo(Users);
Address.hasMany(Order);
Order.belongsTo(Address);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Users.hasMany(Userreview);
Userreview.belongsTo(Users);

Product.hasMany(Productreview);
Productreview.belongsTo(Product);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
