const { Project } = require('../../models');
const { parsePagination, meta } = require('../utils/pagination');

module.exports = {
  async list(req, res, next) {
    try {
      const { teamId, status } = req.query;
      const where = {};
      if (teamId) where.teamId = teamId;
      if (status) where.status = status;
      const { limit, offset, page, sort } = parsePagination(req.query);
      const { rows, count } = await Project.findAndCountAll({ where, limit, offset, order: sort });
      res.json({ data: rows, meta: meta(count, page, limit) });
    } catch (e) { next(e); }
  },
  async get(req, res, next) { try { const item = await Project.findByPk(req.params.id); if (!item) return res.status(404).json({ error: true, message: 'Not found' }); res.json(item); } catch (e) { next(e); } },
  async create(req, res, next) { try { const item = await Project.create(req.body); res.status(201).json(item); } catch (e) { next(e); } },
  async update(req, res, next) { try { const item = await Project.findByPk(req.params.id); if (!item) return res.status(404).json({ error: true, message: 'Not found' }); await item.update(req.body); res.json(item); } catch (e) { next(e); } },
  async remove(req, res, next) { try { const n = await Project.destroy({ where: { id: req.params.id } }); res.json({ deleted: n > 0 }); } catch (e) { next(e); } }
};

