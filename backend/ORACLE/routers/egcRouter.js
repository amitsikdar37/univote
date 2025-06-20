const express = require('express');
const egcSaver = express.Router();

const { saveEgc } = require('../controllers/egcSaver');

egcSaver.post('/api/Save-Election-Criteria', saveEgc);

module.exports = egcSaver;
