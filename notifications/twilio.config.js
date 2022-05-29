const twilio = require('twilio');
require('dotenv').config();
const { write } = require('../config');


const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_ID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = twilio(ACCOUNT_SID, AUTH_TOKEN);

async function sendSMS(phoneNumber, body) {
  try {
    const messagePayload = {
      from: '+17578598827',
      to: phoneNumber,
      body: body
    };
    const messageResponse = await twilioClient.messages.create(messagePayload);
    write('info', messageResponse);
    return messageResponse
  }
  catch(error) {
    write('error', `Error: ${error.message}`);

  }
};

async function sendWhatsapp(phoneNumber, body) {
    try {
      const messagePayload = {
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${phoneNumber}`,
        body: body
      };
      const messageResponse = await twilioClient.messages.create(messagePayload);
      write('info', messageResponse);
      return messageResponse
    }
    catch(error) {
      write('error', `Error: ${error.message}`);
  
    }
  };


module.exports = {
    sendSMS,
    sendWhatsapp
}