const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  phoneNo: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '5m', // OTP expires after 5 minutes
  }
});

module.exports = mongoose.model('Otp', OtpSchema);