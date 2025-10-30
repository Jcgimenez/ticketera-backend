const Joi = require('joi');

const create = Joi.object({
  body: Joi.object({
    hours: Joi.number().positive().precision(2).required(),
    date: Joi.date().required(),
    notes: Joi.string().allow('', null),
    userId: Joi.number().integer().optional(),
    ticketId: Joi.number().integer().required()
  }),
  params: Joi.object({}),
  query: Joi.object({})
});

const list = Joi.object({
  body: Joi.object({}),
  params: Joi.object({}),
  query: Joi.object({
    ticketId: Joi.number().integer(),
    userId: Joi.number().integer(),
    fromDate: Joi.date(),
    toDate: Joi.date(),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    sortBy: Joi.string(),
    order: Joi.string().valid('asc','desc')
  })
});

module.exports = { create, list };

