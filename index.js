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
        return response;
    } catch (error) {
        throw error;
    }
}

// Function entry point for Appwrite
module.exports = async function(req, res) {
    const { to, message } = JSON.parse(req.payload);
    
    try {
        const result = await sendSMS(to, message);
        res.json({ success: true, result });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
};
