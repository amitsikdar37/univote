const express = require('express'); 
const signUpRouter = express.Router();

const { signUp,getSignUp } = require('../controller/signUpController');

signUpRouter.post('/api/SignUp', signUp);
signUpRouter.get('/api/SignUp', getSignUp);

module.exports = signUpRouter;