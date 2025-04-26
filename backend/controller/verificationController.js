const express = require('express');
const twilio = require('twilio');
require('dotenv').config();

const Otp = require('../models/Otp');
const regVoters = require('../models/registrationModel');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendOtp = async (req, res) => {
  const { phoneNo } = req.body;

  const userRegistered = await regVoters.findOne({ phone: phoneNo });
  if (!userRegistered) {
    return res.status(400).json({ message: 'User not registered' });
  }

  // Generate a random OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP

  try {
    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNo,
    });

    await Otp.create({ phoneNo, otp });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
}

exports.verifyOtp = async (req, res) => {
  const { phoneNo, otp } = req.body;

  try {
    const existingOtp = await Otp.findOne({ phoneNo, otp });
    if (!existingOtp) {
      return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
    }

    await Otp.deleteOne({ _id: existingOtp._id }); // Delete OTP after verification
    res.status(200).json({ message: 'OTP verified successfully' }); 
  }
  catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
}