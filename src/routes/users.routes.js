const router = require('express').Router();
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const schema = require('../validators/users');
const ctrl = require('../controllers/users.controller');

router.get('/', auth(['admin','manager']), ctrl.list);
router.get('/:id', auth(['admin','manager']), ctrl.get);
router.post('/', auth(['admin','manager']), validate(schema.create), ctrl.create);
router.patch('/:id', auth(['admin','manager']), validate(schema.update), (req, res, next) => {
  if (req.body.role && req.user.role !== 'admin') {
    const err = new Error('Only admin can change role');
    err.status = 403; return next(err);
  }
  return ctrl.update(req, res, next);
});
router.post('/:id/deactivate', auth(['admin','manager']), ctrl.deactivate);

module.exports = router;

