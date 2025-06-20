const ElectionCriteria = require('../../models/election_criteria');

exports.saveEgc = async (req, res) => {
  try {
    const { election_id, criteria } = req.body;
    const newCriteria = new ElectionCriteria({
      election_id,
      criteria
    });
    await newCriteria.save();
    res.status(201).json({ status: "1", message: 'Criteria saved successfully' });
  } catch (error) {
    res.status(500).json({ status: "0", error: 'Failed to save criteria' });
  }
};