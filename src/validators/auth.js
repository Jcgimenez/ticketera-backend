const Joi = require('joi');

const register = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  params: Joi.object({}),
  query: Joi.object({})
});

const login = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  params: Joi.object({}),
  query: Joi.object({})
});

module.exports = { register, login };

