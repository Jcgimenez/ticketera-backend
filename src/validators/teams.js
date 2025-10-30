const Joi = require('joi');

const create = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().allow('', null)
  }),
  params: Joi.object({}),
  query: Joi.object({})
});

const update = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).optional(),
    description: Joi.string().allow('', null)
  }),
  params: Joi.object({ id: Joi.number().integer().required() }),
  query: Joi.object({})
});

const addUser = Joi.object({
  body: Joi.object({ userId: Joi.number().integer().required() }),
  params: Joi.object({ id: Joi.number().integer().required() }),
  query: Joi.object({})
});

module.exports = { create, update, addUser };

