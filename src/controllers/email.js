const transporter = require('../config/emailer.js')
const createHttpError = require('http-errors');
const path = require('path');
const fs = require('fs');
const handlebars = require("handlebars");

const sendEmailRegister = async (req, res) => {

  const { email, name } = req.body;

  const filePath = path.join(__dirname, '../utils/register.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = { user: name };
  const htmlToSend = template(replacements);

  try {
    await transporter.sendMail({
      from: '"PC Components" <pccomponentshenry@gmail.com>',
      to: email,
      subject: "Email-Registered 📧✔",
      html: htmlToSend,
      headers: { 'x-myheader': 'test header' }
    });

    res.status(201).send('Your email was successfully registered.');
  }
  catch (error) {
    /* const httpError = createHttpError(
        error.statusCode,
        `[Error post mailer] - [email - POST]: ${error.message}`,
      ) */
    res.status(400).send(error.message);

  }
};


const sendEmail = async (req, res) => {
  const { email, name, cart, value } = req.body;

  const filePath = path.join(__dirname, '../utils/register.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = { user: name, value };
  const htmlToSend = template(replacements);

  try {

    await transporter.sendMail({
      from: '"PC Components" <pccomponentshenry@gmail.com>',
      to: email,
      subject: "Purchase Made ✔",
      html: htmlToSend,
      headers: { 'x-myheader': 'test header' }
    });

    res.status(200).send('Email Send')
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}


module.exports = {
  sendEmailRegister,
  sendEmail
}