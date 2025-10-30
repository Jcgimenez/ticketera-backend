const { Ticket, TimeEntry } = require('../../models');
const { parsePagination, meta } = require('../utils/pagination');
const { Sequelize } = require('sequelize');

module.exports = {
  async list(req, res, next) {
    try {
      const { status, projectId, assigneeId, priority } = req.query;
      const where = {};
      if (status) where.status = status;
      if (projectId) where.projectId = projectId;
      if (assigneeId) where.assigneeId = assigneeId;
      if (priority) where.priority = priority;
      const { limit, offset, page, sort } = parsePagination(req.query);
      const { rows, count } = await Ticket.findAndCountAll({ where, limit, offset, order: sort });
      res.json({ data: rows, meta: meta(count, page, limit) });
    } catch (e) { next(e); }
  },
  async get(req, res, next) { try { const item = await Ticket.findByPk(req.params.id); if (!item) return res.status(404).json({ error: true, message: 'Not found' }); res.json(item); } catch (e) { next(e); } },
  async create(req, res, next) { try { const item = await Ticket.create(req.body); res.status(201).json(item); } catch (e) { next(e); } },
  async update(req, res, next) { try { const item = await Ticket.findByPk(req.params.id); if (!item) return res.status(404).json({ error: true, message: 'Not found' }); await item.update(req.body); res.json(item); } catch (e) { next(e); } },
  async remove(req, res, next) { try { const n = await Ticket.destroy({ where: { id: req.params.id } }); res.json({ deleted: n > 0 }); } catch (e) { next(e); } },
  async summary(req, res, next) {
    try {
      const ticketId = req.params.id;
      const row = await TimeEntry.findOne({
        attributes: [[Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('hours')), 0), 'totalHours']],
        where: { ticketId },
        raw: true
      });
      res.json({ ticketId: Number(ticketId), totalHours: Number(row.totalHours || 0) });
    } catch (e) { next(e); }
  }
};

