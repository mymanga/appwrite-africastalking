import { Client, Users } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
    const africastalking = require('africastalking')({
      apiKey: process.env.AFRICASTALKING_API_KEY,
      username: process.env.AFRICASTALKING_USERNAME
  });
  
  async function sendSMS(to, message) {
      const sms = africastalking.SMS;
      try {
          const response = await sms.send({
              to: [to],
              message: message,
          });
          console.log('SMS Sent', response);
          return response;
      } catch (error) {
          console.error('Error sending SMS', error);
          throw error;
      }
  }
  
  // Appwrite function handler
  module.exports = async function(req, res) {
      const { to, message } = JSON.parse(req.payload);
      
      try {
          const result = await sendSMS(to, message);
          res.json({ success: true, result });
      } catch (error) {
          res.json({ success: false, error: error.message });
      }
  };
  
};
