require('dotenv').config();
const axios = require('axios');

// Replace with your actual Mailboxlayer API key
const MailboxlayerApiKey = process.env.MAILBOXLAYER_API_KEY;

const validateEmailWithMailboxlayer = async (email) => {
  try {
    const response = await axios.get(`http://apilayer.net/api/check`, {
      params: {
        access_key: MailboxlayerApiKey,
        email: email,
        smtp: 1,           // check if email exists
        format: 1
      }
    });

    const data = response.data;

    if (!data.format_valid || !data.mx_found || !data.smtp_check) {
      return {
        valid: false,
        reason: 'Invalid or non-existent email address'
      };
    }

    return { valid: true };
  } catch (error) {
    console.error('Email validation error:', error.message);
    return {
      valid: false,
      reason: 'Email validation service failed'
    };
  }
}

module.exports = { validateEmailWithMailboxlayer };