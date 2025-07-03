const { sendOtp } = require('../utils/emailOtp');

exports.sendCode = async (req, res) => {
  const { type, email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    let response;
    if (type === 'iitp') {
      if (!email.endsWith('@iitp.ac.in')) {
        return res.status(400).json({ error: 'Invalid IITP email format' });
      }
      response = await sendOtp(email, 'IITP');
    } else if (type === 'gmail') {
      response = await sendOtp(email, 'Gmail');
    } else {
      return res.status(400).json({ error: 'Invalid account type' });
    }

    if (response.sent) {
      return res.status(200).json({ message: response.message });
    } else {
      return res.status(500).json({ error: response.message });
    }
  } catch (error) {
    console.error('Error sending code:', error);
    return res.status(500).json({ error: 'Failed to send code' });
  }
}

