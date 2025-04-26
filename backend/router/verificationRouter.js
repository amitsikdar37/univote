const express = require('express');
const verificationRouter = express.Router();

const authenticate = require('../authenticate/jwtCheck');
const { sendOtp, verifyOtp } = require('../controller/verificationController');

verificationRouter.post('/api/Send-Otp',authenticate, sendOtp);
verificationRouter.post('/api/Verify-Otp', authenticate, verifyOtp);

module.exports = verificationRouter;