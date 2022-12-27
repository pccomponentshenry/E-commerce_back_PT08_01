const transporter = require('../config/emailer.js')
const createHttpError = require('http-errors');




const sendEmailRegister = async (req, res) => {
    const {email, name}= req.body
        try {
            await transporter.sendMail({
                from: '"PC Components" <pccomponentshenry@gmail.com>', 
                to: email, 
                subject: "Email-Registered 📧✔", 
                html: 
                `<h1>Hi! ${name}...</h1>
                <h2>Your email was successfully registered.</h2>
                ` 
              })
              res.status(201).send('Your email was successfully registered.')
        } catch (error) {
            /* const httpError = createHttpError(
                error.statusCode,
                `[Error post mailer] - [email - POST]: ${error.message}`,
              ) */
              res.status(400).send(error.message)
            
        }
};


const sendEmail= async (req, res) => {
        const { email, name, cart, value }= req.body
        try {
            await transporter.sendMail({
                from: '"PC Components" <pccomponentshenry@gmail.com>', 
                to: email, 
                subject: "Purchase Made ✔", 
                html: 
                `<h1>Hi! ${name}...</h1>
                <h2>Thanks for you Purchase</h2>
                
                <h3>Purchase detail</h3>
                
                <h2>Total: U$D ${value}</h2>` 
              }); 
                  res.status(200).send('Email Send')
                }
         catch (error) {
            res.status(400).json({error: error.message})
        }
}


module.exports = {
    sendEmailRegister,
    sendEmail
}