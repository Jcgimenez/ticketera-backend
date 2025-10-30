const router = require('express').Router();
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const schema = require('../validators/teams');
const ctrl = require('../controllers/teams.controller');

router.get('/', auth(['admin','manager']), ctrl.list);
router.get('/:id', auth(['admin','manager']), ctrl.get);
router.post('/', auth(['admin','manager']), validate(schema.create), ctrl.create);
router.patch('/:id', auth(['admin','manager']), validate(schema.update), ctrl.update);
router.delete('/:id', auth(['admin','manager']), ctrl.remove);
router.post('/:id/users', auth(['admin','manager']), validate(schema.addUser), ctrl.addUser);
router.delete('/:id/users/:userId', auth(['admin','manager']), ctrl.removeUser);

module.exports = router;

