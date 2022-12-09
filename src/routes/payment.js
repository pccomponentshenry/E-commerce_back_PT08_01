const { Router } = require("express");
const Stripe = require("stripe")
const router = Router();

const stripe = new Stripe("sk_test_51MCUPjIxZNdfrxaOsZ59U0ATCiZvptWltsYPlQ4y5PwhVXLSjds6NlqeII3vVBaxSlk2GXqsTgotPJsGD46BTnw7008OcriKDy");

router.post('/api/checkout', async (req, res) =>{
    try {
        const payment = await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:"USD",
            description:"compra de prueba",
            payment_method:req.body.id,
            confirm:true
        })
        console.log(payment)
        res.send({message:'Pago aceptado'})
        
    } catch (error) {
        res.json({message:error.raw.message})
    }
})


module.exports = router;