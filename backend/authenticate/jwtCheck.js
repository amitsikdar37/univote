const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access. No token provided.', redirectTo: '/api/SignUp' }); 
    }
    const Secret_Key = process.env.SECRET_KEY;
    try {
        const decoded = jwt.verify(token, Secret_Key);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticate;
