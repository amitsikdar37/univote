const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const sendJwtToken = async (res, payload) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const Secret_Key = process.env.SECRET_KEY;

    if (!Secret_Key) {
        throw new Error('SECRET_KEY is not defined in environment variables');
    }

    const token = jwt.sign(payload, Secret_Key, { expiresIn: '7d' });

    res.cookie('token', token, { 
      httpOnly: true, 
      secure: isProduction, 
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });
}

const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    const Secret_Key = process.env.SECRET_KEY;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access. No token provided.' }); 
    }
    if (!Secret_Key) {
        throw new Error('SECRET_KEY is not defined in environment variables');
    }
    try {
        const decoded = jwt.verify(token, Secret_Key);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please log in again.' });
        }
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = { authenticate, sendJwtToken };

