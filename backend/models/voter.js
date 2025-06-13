const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
  }
}, { timestamps: true });

module.exports = mongoose.model('Voter', voterSchema);