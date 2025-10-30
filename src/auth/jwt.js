const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const EXPIRES_IN = '7d';

module.exports = {
  sign(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
  },
  verify(token) {
    return jwt.verify(token, JWT_SECRET);
  }
};

