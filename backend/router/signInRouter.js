const express = require('express');
const signInRouter = express.Router();
const { signIn }= require('../controller/signInController');
 
signInRouter.post('/api/SignIn', signIn);

module.exports = signInRouter;