const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes');
const errorHandler = require('./middlewares/error');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/health', (req, res) => res.json({ ok: true }));

const openapiPath = path.join(__dirname, '..', 'docs', 'openapi.json');
let openapi = {};
if (fs.existsSync(openapiPath)) {
  openapi = JSON.parse(fs.readFileSync(openapiPath, 'utf-8'));
}
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.use('/api', apiRoutes);

app.use(errorHandler);

module.exports = app;

