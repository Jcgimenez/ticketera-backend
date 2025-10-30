const { TimeEntry } = require('../../models');
const { Op } = require('sequelize');
const { parsePagination, meta } = require('../utils/pagination');

module.exports = {
  async list(req, res, next) {
    try {
      const { ticketId, fromDate, toDate, userId } = req.query;
      const where = {};
      if (ticketId) where.ticketId = ticketId;
      if (userId) where.userId = userId;
      if (fromDate || toDate) {
        where.date = {};
        if (fromDate) where.date[Op.gte] = fromDate;
        if (toDate) where.date[Op.lte] = toDate;
      }
      const { limit, offset, page, sort } = parsePagination(req.query);
      const { rows, count } = await TimeEntry.findAndCountAll({ where, limit, offset, order: sort });
      res.json({ data: rows, meta: meta(count, page, limit) });
    } catch (e) { next(e); }
  },
  async create(req, res, next) {
    try {
      const payload = { ...req.body };
      if (!payload.userId) payload.userId = req.user?.id;
      const item = await TimeEntry.create(payload);
      res.status(201).json(item);
    } catch (e) { next(e); }
  }
};
