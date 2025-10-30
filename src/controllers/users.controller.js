const { User } = require('../../models');
const { parsePagination, meta } = require('../utils/pagination');
const hashSvc = require('../auth/hash');

module.exports = {
  async list(req, res, next) {
    try {
      const { role, active } = req.query;
      const where = {};
      if (role) where.role = role;
      if (active !== undefined) where.active = active === 'true';
      const { limit, offset, page, sort } = parsePagination(req.query);
      const { rows, count } = await User.findAndCountAll({ where, limit, offset, order: sort, attributes: { exclude: ['passwordHash'] } });
      res.json({ data: rows, meta: meta(count, page, limit) });
    } catch (e) { next(e); }
  },
  async get(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id, { attributes: { exclude: ['passwordHash'] } });
      if (!user) return res.status(404).json({ error: true, message: 'Not found' });
      res.json(user);
    } catch (e) { next(e); }
  },
  async create(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      const exists = await User.findOne({ where: { email } });
      if (exists) { const err = new Error('Email already registered'); err.status = 409; throw err; }
      const passwordHash = await hashSvc.hash(password);
      const user = await User.create({ name, email, passwordHash, role: role || 'member' });
      res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role, active: user.active });
    } catch (e) { next(e); }
  },
  async update(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: true, message: 'Not found' });
      const { name, email, role, active } = req.body;
      if (email && email !== user.email) {
        const exists = await User.findOne({ where: { email } });
        if (exists) { const err = new Error('Email already registered'); err.status = 409; throw err; }
      }
      await user.update({ name, email, role, active });
      res.json({ id: user.id, name: user.name, email: user.email, role: user.role, active: user.active });
    } catch (e) { next(e); }
  },
  async deactivate(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: true, message: 'Not found' });
      await user.update({ active: false });
      res.json({ id: user.id, active: user.active });
    } catch (e) { next(e); }
  }
};

