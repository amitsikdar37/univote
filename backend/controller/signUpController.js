const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');

const { check, validationResult } = require('express-validator');
const Voters = require('../models/voter'); 

exports.getSignUp = (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'frorm.html'));
}

exports.signUp = [
  check('firstname')
  .trim()
  .isLength({ min: 2 })
  .matches(/^[a-zA-Z]+$/)
  .withMessage('First name must be at least 2 characters long and contain only letters')
  .notEmpty()
  .withMessage('First name is required'),

  check('lastname')
  .trim()
  .isLength({ min: 2 })
  .matches(/^[a-zA-Z]+$/)
  .withMessage('Last name must be at least 2 characters long and contain only letters')
  .notEmpty().
  withMessage('Last name is required'), 

  check('email')
  .normalizeEmail()
  .isEmail()
  .withMessage('Valid email is required'),

  check('password')
  .trim()
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
  .withMessage('Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long'),

  check('confirmPassword')
  .trim()
  .notEmpty()
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),

  async (req, res) => {
    try {
      const { firstname, lastname, email, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          formData: { firstname, lastname, email }
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const voter = new Voters({
        firstname,
        lastname,
        email,
        password: hashedPassword
      });

      await voter.save()
        .then(() => {
          console.log('Voter saved successfully', voter);
        })
        .catch((error) => {
          console.error('Error saving voter:', error);
          return res.status(500).json({ message: 'Error saving voter' });
        });

      const isProduction = process.env.NODE_ENV === 'production';  

      const Secret_Key = process.env.SECRET_KEY;
      const userPayload = { firstname, lastname, email };
      const token = jwt.sign(userPayload, Secret_Key, { expiresIn: '7d' });
      
      res.cookie('token', token, { 
        httpOnly: true, 
        secure: isProduction, 
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 
      });

      res.redirect('/api/Homepage'); // Redirect to the homepage after successful sign-up
    } catch (error) {
      console.error('SignUp error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
]  