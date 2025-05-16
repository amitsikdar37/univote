const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const Voters = require('../models/voter');

exports.signIn = [
  check('email')
  .normalizeEmail()
  .isEmail()
  .withMessage('Valid email is required'),

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
      
      const isProduction = process.env.NODE_ENV === 'production';  

      const Secret_Key = 'univote';
      const userPayload = { email, password };
      const token = jwt.sign(userPayload, Secret_Key, { expiresIn: '7d' });
      
      res.cookie('token', token, { 
        httpOnly: true, 
        secure: isProduction, 
        sameSite: isProduction ? 'None' : 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 
      });

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
