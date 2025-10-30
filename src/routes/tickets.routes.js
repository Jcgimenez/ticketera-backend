const router = require('express').Router();
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const schema = require('../validators/tickets');
const ctrl = require('../controllers/tickets.controller');

router.get('/', auth(['admin','manager','member']), validate(schema.list), ctrl.list);
router.get('/:id', auth(['admin','manager','member']), ctrl.get);
router.get('/:id/summary', auth(['admin','manager','member']), ctrl.summary);
router.post('/', auth(['admin','manager','member']), validate(schema.create), ctrl.create);
router.patch('/:id', auth(['admin','manager']), validate(schema.update), ctrl.update);
router.delete('/:id', auth(['admin','manager']), ctrl.remove);

module.exports = router;

