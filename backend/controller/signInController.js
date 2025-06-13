const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const Voters = require('../models/voter');
const { sendJwtToken } =  require('../authenticate/jwtCheck');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

exports.googleSignIn = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ errors: [{ param: 'token', msg: 'ID Token is required' }] });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, sub: googleId, name } = payload;

    let voter = await Voters.findOne({ googleId });
    if (!voter) {
      voter = new Voters({ email, googleId, name });
      await voter.save();
    }

    sendJwtToken(res, { email });

    res.status(200).json({ message: 'Google SignIn successful' });
  } catch (error) {
    console.error('Google SignIn error:', error);
    res.status(500).json({ errors: [{ param: 'form', msg: 'Server Error.' }] });
  }
};
