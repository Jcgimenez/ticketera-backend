const router = require('express').Router();
const validate = require('../middlewares/validate');
const schema = require('../validators/auth');
const ctrl = require('../controllers/auth.controller');

router.post('/register', validate(schema.register), ctrl.register);
router.post('/login', validate(schema.login), ctrl.login);

module.exports = router;

