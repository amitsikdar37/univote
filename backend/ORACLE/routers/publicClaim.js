const express = require('express');
const publicClaimRouter = express.Router();
const { authenticate } = require('../../authenticate/jwtCheck');

const { checkPublicClaim } = require('../controllers/publicClaimHandler');

publicClaimRouter.get('/api/CheckPublicClaim', authenticate, checkPublicClaim);

module.exports = publicClaimRouter;