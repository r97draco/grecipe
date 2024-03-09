const Joi = require('joi');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    userName: Joi.string().required(),
    photoURL: Joi.string().optional(),
    family: Joi.string().optional(),
    isFamilyHead: Joi.boolean().optional(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const updateUser = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    userName: Joi.string(),
    photoURL: Joi.string(),
    family: Joi.string(),
    isFamilyHead: Joi.boolean(),
  }),

  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
