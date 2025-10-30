const serverless = require('serverless-http');
require('dotenv').config();
const app = require('../src/app');
const { sequelize } = require('../models');

let initialized = false;
async function init() {
  if (!initialized) {
    await sequelize.authenticate();
    initialized = true;
  }
}

const handler = serverless(app);

module.exports = async (req, res) => {
  try {
    await init();
  } catch (e) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: true, message: 'DB connection failed', details: e.message }));
  }
  return handler(req, res);
};

