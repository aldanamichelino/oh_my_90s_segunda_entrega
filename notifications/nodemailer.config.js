const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();
const { write } = require('../config');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_NODEMAILER_PASSWORD
  }
});


async function sendNotification(mailOptions)  {
    try {
        const mailInfo = await transporter.sendMail(mailOptions);
        write('info', mailInfo);
        return mailInfo;
  }
  catch(error){
    write('error', `Error: ${error.message}`);
  }
};

module.exports = {
    sendNotification
}