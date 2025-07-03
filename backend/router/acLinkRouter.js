const express = require('express');
const router = express.Router();
const { authenticate } = require('../authenticate/jwtCheck');
const { sendCode } = require('../controllers/acLinkController');

router.post('/api/accounts/send-otp', authenticate, sendCode);

module.exports = router;