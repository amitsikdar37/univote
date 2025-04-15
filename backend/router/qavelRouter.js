const express = require('express');
const qavelRouter = express.Router();

const qavelController = require('../controller/qavelController');

qavelRouter.get('/api/Qavel', qavelController.getQavel);

module.exports = qavelRouter;