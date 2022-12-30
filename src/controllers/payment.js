const { Router } = require("express");
const Stripe = require("stripe");
require('dotenv').config();
const { DB_PAYMENT } = process.env;

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
      cancel_url: `http://localhost:5173/cart`,
    });

    res.status(200).send({ id: session.id });
  }
  catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { handlePayment };