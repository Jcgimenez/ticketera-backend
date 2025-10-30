const Joi = require('joi');

const create = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin','manager','member').optional()
  }),
  params: Joi.object({}),
  query: Joi.object({})
});

const update = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().valid('admin','manager','member').optional(),
    active: Joi.boolean().optional()
  }),
  params: Joi.object({ id: Joi.number().integer().required() }),
  query: Joi.object({})
});

module.exports = { create, update };

