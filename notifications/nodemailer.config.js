const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();
const { write } = require('../winston/logger.config');
const { ADMIN_EMAIL, ADMIN_NODEMAILER_PASSWORD } = require('../config');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_NODEMAILER_PASSWORD
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