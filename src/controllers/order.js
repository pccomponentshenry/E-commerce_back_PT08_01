const Stripe = require("stripe");
require('dotenv').config();
const { DB_PAYMENT } = process.env;
const { Order, OrderItem, Product } = require('../db');

const stripe = new Stripe(DB_PAYMENT);

const handlePayment = async (req, res) => {
  const products = req.body.products;

  const listProduct = [];

  products.forEach(p => {
    let lineProduct = {
      price_data: {
        currency: "usd",
        product_data: {
          name: p.name,
          images: p.images
        },
        unit_amount: p.price
      },
      quantity: p.quantity
    }
    listProduct.push(lineProduct);
  })
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: listProduct,
      mode: 'payment',
      success_url: "http://localhost:5173/success",
      cancel_url: `http://localhost:5173/order`,
    });

    res.status(200).send({ id: session.id });
  }
  catch (error) {
    res.status(400).send(error);
  }
}

const createOrder = async (req, res) => {
  const { userId, addressId } = req.body;

  try {
    const order = await Order.create({ userId, addressId });
    res.status(200).send({ id: order.id });
  }
  catch (error) {
    res.status(400).send(error);
  }
}

const createOrderItem = async (req, res) => {
  const { orderId, item } = req.body;

  try {
    await OrderItem.create({ orderId, quantity: item.quantity, productId: item.productId, price: item.price });
    res.status(200).send("Order successfully created");
  }
  catch (error) {
    res.status(400).send(error);
  }
}

const changeOrderStatus = async (req, res) => {
  const { userId, status } = req.body;

  try {
    await Order.update({ status },
      {
        where: {
          status: "created",
          userId
        }
      }
    );

    res.status(200).send(`Order successfully ${status}`);
  }
  catch (error) {
    res.status(400).send(error);
  }
}

const getOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.findAll({
      where: { userId },
      include: {
        model: OrderItem,
        include: Product
      }
    });

    res.status(200).send(orders);
  }
  catch (error) {
    res.status(400).send(error);
  }
}


module.exports = { handlePayment, createOrder, createOrderItem, changeOrderStatus, getOrders };