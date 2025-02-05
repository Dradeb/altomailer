index.js                                                                                                 
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 80;
const rateLimit = require("express-rate-limit");
// Middleware
app.use(cors());
app.use(bodyParser.json());


var smtpConfig = {
  host: 'mail.altorcrossfit.com',
  port: 465,
  secure: true, // use SSL
  auth: {
      user: 'form@altorcrossfit.com',
      pass: process.env.PASS
  }
};
var transporter = nodemailer.createTransport(smtpConfig);


// API endpoint to send emails
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'form@altorcrossfit.com', // Sender address
    to : 'contact@altorcrossfit.com', // Recipient address
    subject : 'New contact', // Email subject
    text, // Email body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })