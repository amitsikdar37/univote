const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');

const { check, validationResult } = require('express-validator');
const Voters = require('../models/voter'); 
const { sendOtp, verifyOtp } = require('../utils/emailOtp');

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
  .trim(),

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

      const voterExists = await Voters.findOne({ email });

      if (voterExists) {
        return res.status(409).json({
          errors:[{ param: 'email', msg: 'Email Already Exists' }]
        })
      }

      const otpSent = await sendOtp(email);

      if (otpSent.sent === false){
        return res.status(400).json({
          errors: [{ msg: otpSent.message, param: 'email' }]
        });
      }
      else {
        req.session.formData = { firstname, lastname, email, password };
        
        return res.status(200).json({
          errors:[{ msg: otpSent.message, param: 'email' }]
        })}
    } catch (error) {
        console.error('SignUp error:', error);
        res.status(500).json({ 
          errors: [{ param: 'form', msg: 'Server Error.' }]
        }); 
      }
  }     
]

exports.saveUserToDb = async (req,res) => {
  const { otp } = req.body;
  const { firstname, lastname, email, password } = req.session.formData;

  const otpVerified = await verifyOtp(email, otp);

  if (otpVerified.verified === false){
    return res.status(400).json({
      errors: [{ msg: otpVerified.message, param: 'email' }]
    });
  } else {
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
        if (error.code === 11000 && error.keyPattern?.email) {
          return res.status(400).json({
            errors: [{ param: 'email', msg: 'Email already exists' }]
          });
        }
      
        // Fallback for other DB errors
        return res.status(500).json({
          errors: [{ param: 'form', msg: 'Something went wrong. Please try again.' }]
        });
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

    res.status(201).json({
      message: 'User Registered Succesfully.' 
    });
  }
}
        