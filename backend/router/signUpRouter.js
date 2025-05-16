const express = require('express'); 
const signUpRouter = express.Router();

const { signUp, saveUserToDb } = require('../controller/signUpController');

signUpRouter.post('/api/SendOtp', signUp);
signUpRouter.post('/api/verifyOtp', saveUserToDb);

module.exports = signUpRouter;