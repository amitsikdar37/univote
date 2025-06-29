const express = require('express');
const egcSaver = express.Router();

const { saveEgc, getElectionTopicById } = require('../controllers/egcSaver');

egcSaver.post('/api/Save-Election-Criteria', saveEgc);
egcSaver.get('/api/election-criteria/:electionId', getElectionTopicById);

module.exports = egcSaver;
