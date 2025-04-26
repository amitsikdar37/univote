const express = require('express'); 
const registrationRouter = express.Router();

const authenticate = require('../authenticate/jwtCheck');
const { sendRegOtp,verifyRegOtp } = require('../controller/registrationController');


registrationRouter.post('/api/Register', authenticate, sendRegOtp);
registrationRouter.post('/api/VerifyReg-Otp',authenticate, verifyRegOtp);

module.exports = registrationRouter;