const { User } = require('../../models');
const hashSvc = require('../auth/hash');
const jwt = require('../auth/jwt');

module.exports = {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const exists = await User.findOne({ where: { email } });
      if (exists) {
        const err = new Error('Email already registered');
        err.status = 409;
        throw err;
      }
      const passwordHash = await hashSvc.hash(password);
      const user = await User.create({ name, email, passwordHash, role: 'member' });
      const token = jwt.sign({ sub: user.id, email: user.email, role: user.role, name: user.name });
      res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (e) { next(e); }
  },
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email, active: true } });
      if (!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        throw err;
      }
      const ok = await hashSvc.compare(password, user.passwordHash);
      if (!ok) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        throw err;
      }
      const token = jwt.sign({ sub: user.id, email: user.email, role: user.role, name: user.name });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (e) { next(e); }
  }
};

