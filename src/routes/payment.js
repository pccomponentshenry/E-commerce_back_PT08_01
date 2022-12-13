const { Router } = require("express");
require('dotenv').config();
const Stripe = require("stripe")
const router = Router();
const {DB_PAYMENT} = process.env;

const stripe = new Stripe(DB_PAYMENT);


router.post('/api/checkout', async (req, res) =>{
    let product=req.body.products
    // console.log("body",product)
    let listProduct=[];

    product.forEach(p => {
        let lineProduct = {
            price_data:{
                currency:"usd",
                product_data:{
                    name:p.name,
                    images:p.images
                },
                unit_amount: p.price
              },
              quantity:p.quantity
        }
        listProduct.push(lineProduct);
    })

    const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items: listProduct,
    mode: 'payment',
    success_url: `http://localhost:5173`,
    cancel_url: `http://localhost:5173/cart`,
    });
  
    res.json({id:session.id})
})


module.exports = router;