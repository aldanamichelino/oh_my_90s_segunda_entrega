const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(process.cwd(), `${process.env.NODE_ENV.trim()}.env`)
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 8080,
  DATA_SOURCE: process.env.DATA_SOURCE,
  MONGODB_URI: process.env.MONGODB_URI,
  SECURE_MONGODB_URI: process.env.SECURE_MONGODB_URI,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  SESSION_SECRET: process.env.SESSION_SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_WHATSAPP: process.env.ADMIN_EMAIL,
  ADMIN_NODEMAILER_PASSWORD: process.env.ADMIN_NODEMAILER_PASSWORD,
  TWILIO_ACCOUNT_ID: process.env.TWILIO_ACCOUNT_ID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  SESSION_TIMEOUT: process.env.SESSION_TIMEOUT
}