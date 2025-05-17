const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const Voters = require('../models/voter');
const { sendJwtToken } =  require('../authenticate/jwtCheck');

exports.signIn = [
  check('email')
  .normalizeEmail()
  .isEmail()
  .withMessage('Valid email is required')
  .custom((value) => {
    if (!value.endsWith('@iitp.ac.in')) {
      throw new Error('Email must be an IIT Patna email ending with @iitp.ac.in');
    }
    return true;
  }),

  check('password')
  .trim(),
  
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }      

      const voter =  await Voters.findOne({ email });
      if (!voter) {
        return res.status(401).json({ 
          errors: [{ param: 'email', msg: 'Email Not Found' }]
        });
      }
      const isMatch = await bcrypt.compare(password, voter.password);
      if (!isMatch) {
        return res.status(401).json({
          errors: [{ param: 'password', msg: 'Invalid Password' }]
        });
      }
      
      sendJwtToken(res, { email });

      res.status(200).json({ 
        message: 'SignIn successful'
      });

      console.log('Received:', email, password); 

    } catch (error) {
      console.error('SignIn error:', error);
      res.status(500).json({ errors: [{ param: 'form', msg: 'Server Error.' }] });
    }
  }
] 
