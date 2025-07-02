const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
  },
  googleId: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  xId: {
    type: String,
    unique: true,
    sparse: true
  },
  linkedAccounts: {
    google: { type: Boolean, default: false },
    iitp: { type: Boolean, default: false },
    x: { type: Boolean, default: false },
  },
}, { timestamps: true });

module.exports = mongoose.model('Voter', voterSchema);