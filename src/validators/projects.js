const Joi = require('joi');

const create = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().allow('', null),
    status: Joi.string().valid('active','archived').default('active'),
    teamId: Joi.number().integer().required()
  }),
  params: Joi.object({}),
  query: Joi.object({})
});

const update = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).optional(),
    description: Joi.string().allow('', null),
    status: Joi.string().valid('active','archived').optional()
  }),
  params: Joi.object({ id: Joi.number().integer().required() }),
  query: Joi.object({})
});

const list = Joi.object({
  body: Joi.object({}),
  params: Joi.object({}),
  query: Joi.object({
    teamId: Joi.number().integer(),
    status: Joi.string().valid('active','archived'),
    page: Joi.number().integer().min(1),
    limit: Joi.number().integer().min(1).max(100),
    sortBy: Joi.string(),
    order: Joi.string().valid('asc','desc')
  })
});

module.exports = { create, update, list };

