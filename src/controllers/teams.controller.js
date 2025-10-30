const { Team, User } = require('../../models');
const { parsePagination, meta } = require('../utils/pagination');

module.exports = {
  async list(req, res, next) {
    try {
      const { limit, offset, page, sort } = parsePagination(req.query);
      const { rows, count } = await Team.findAndCountAll({ limit, offset, order: sort });
      res.json({ data: rows, meta: meta(count, page, limit) });
    } catch (e) { next(e); }
  },
  async get(req, res, next) {
    try {
      const team = await Team.findByPk(req.params.id, { include: { model: User, through: { attributes: [] } } });
      if (!team) return res.status(404).json({ error: true, message: 'Not found' });
      res.json(team);
    } catch (e) { next(e); }
  },
  async create(req, res, next) {
    try { const team = await Team.create(req.body); res.status(201).json(team); } catch (e) { next(e); }
  },
  async update(req, res, next) {
    try {
      const team = await Team.findByPk(req.params.id);
      if (!team) return res.status(404).json({ error: true, message: 'Not found' });
      await team.update(req.body);
      res.json(team);
    } catch (e) { next(e); }
  },
  async remove(req, res, next) { try { const n = await Team.destroy({ where: { id: req.params.id } }); res.json({ deleted: n > 0 }); } catch (e) { next(e); } },
  async addUser(req, res, next) {
    try {
      const team = await Team.findByPk(req.params.id);
      const user = await User.findByPk(req.body.userId);
      if (!team || !user) return res.status(404).json({ error: true, message: 'Not found' });
      await team.addUser(user);
      res.status(204).end();
    } catch (e) { next(e); }
  },
  async removeUser(req, res, next) {
    try {
      const team = await Team.findByPk(req.params.id);
      const user = await User.findByPk(req.params.userId);
      if (!team || !user) return res.status(404).json({ error: true, message: 'Not found' });
      await team.removeUser(user);
      res.status(204).end();
    } catch (e) { next(e); }
  }
};

