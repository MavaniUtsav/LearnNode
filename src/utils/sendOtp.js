const twilio = require('twilio')
const accountSid = 'AC9bccc465b6753fda484e8431ea9ae6f3';
const authToken = '4606d6898eac6801c115bbd3050e5179';
const client = twilio(accountSid, authToken);

const sendOTP = async (req, res, next) => {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate a random OTP between 1000 and 9999
    await client.messages
        .create({
            body: 'Your OTP is: ' + otp,
            from: '+16592668464',
            to: req.body.Mobile_no
        })
        .then(message => {
            req.session.otp = otp
            next()
        })
        .catch(error => console.error('Error sending OTP:', error));
}

const verifyOTP = async (req, res, next) => {
    if (req.body.otp === req.session.otp) {
        res.status(200).json({
            message: 'OTP verified successfully!!'
        })
    } else {
        res.status(400).json({
            message: 'Wrong  OTP entered!'
        })
    }
}

module.exports = {
    sendOTP,
    verifyOTP
}