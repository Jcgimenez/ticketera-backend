const Joi = require('joi');

const create = Joi.object({
  body: Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().allow('', null),
    status: Joi.string().valid('open','in_progress','done').default('open'),
    priority: Joi.string().valid('low','medium','high').default('medium'),
    projectId: Joi.number().integer().required(),
    assigneeId: Joi.number().integer().allow(null)
  }),
  params: Joi.object({}),
  query: Joi.object({})
});

const update = Joi.object({
  body: Joi.object({
    title: Joi.string().min(2),
    description: Joi.string().allow('', null),
    status: Joi.string().valid('open','in_progress','done'),
    priority: Joi.string().valid('low','medium','high'),
    assigneeId: Joi.number().integer().allow(null)
  }),
  params: Joi.object({ id: Joi.number().integer().required() }),
  query: Joi.object({})
});

const list = Joi.object({
  body: Joi.object({}),
  params: Joi.object({}),
  query: Joi.object({
    status: Joi.string().valid('open','in_progress','done'),
    projectId: Joi.number().integer(),
    assigneeId: Joi.number().integer(),
    priority: Joi.string().valid('low','medium','high'),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    sortBy: Joi.string(),
    order: Joi.string().valid('asc','desc')
  })
});

module.exports = { create, update, list };

