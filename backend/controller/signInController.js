const express = require('express');

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    //authentication code here
    console.log('Received:', email, password); 
    
    res.json({ message: 'Sign in successful' });
  } catch (error) {
    console.error('SignIn error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
