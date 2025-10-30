const router = require('express').Router();
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const schema = require('../validators/projects');
const ctrl = require('../controllers/projects.controller');

router.get('/', auth(['admin','manager','member']), validate(schema.list), ctrl.list);
router.get('/:id', auth(['admin','manager','member']), ctrl.get);
router.post('/', auth(['admin','manager']), validate(schema.create), ctrl.create);
router.patch('/:id', auth(['admin','manager']), validate(schema.update), ctrl.update);
router.delete('/:id', auth(['admin','manager']), ctrl.remove);

module.exports = router;

