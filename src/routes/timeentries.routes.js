const router = require('express').Router();
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const schema = require('../validators/timeentries');
const ctrl = require('../controllers/timeentries.controller');

router.get('/', auth(['admin','manager','member']), validate(schema.list), ctrl.list);
router.post('/', auth(['admin','manager','member']), validate(schema.create), ctrl.create);

module.exports = router;

