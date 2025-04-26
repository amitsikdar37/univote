const express = require("express");
const twilio = require('twilio');
require('dotenv').config();

const regVoters = require('../models/registrationModel');
const Otp = require('../models/Otp');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

let storedphoneNo = '';
let storedWalletAddress = '';

exports.sendRegOtp = async (req, res) => {
  const { phoneNo, walletAddress } = req.body;
  storedphoneNo = phoneNo;
  storedWalletAddress = walletAddress;
  
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

exports.verifyRegOtp = async (req, res) => {
  const { phoneNo, otp } = req.body;

  try {
    const existingOtp = await Otp.findOne({ phoneNo, otp });
    if (!existingOtp) {
      return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
    }

    await Otp.deleteOne({ _id: existingOtp._id }); // Delete OTP after verification

    const alreadyRegistered = await regVoters.findOne({ phone: storedphoneNo, wallet: storedWalletAddress });
    if (alreadyRegistered) {
      return res.status(400).json({ message: 'User already registered' });
    }
    await regVoters.create({ phone: storedphoneNo, wallet: storedWalletAddress, hasVoted: false });
    res.status(200).json({ message: 'OTP Verified! Redirecting to homepage', redirect: '/homepage.html' });
  }
  catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
}