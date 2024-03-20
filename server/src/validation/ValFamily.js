const Joi = require('joi');

const createFamily = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    members: Joi.array().items(Joi.string().required()),
  }),
};

const getFamily = {
  params: Joi.object().keys({
    familyId: Joi.string().required(),
  }),
};

const updateFamily = {
  body: Joi.object().keys({
    name: Joi.string(),
    members: Joi.array().items(Joi.string()),
  }),

  params: Joi.object().keys({
    familyId: Joi.string().required(),
  }),
};

const deleteFamily = {
  params: Joi.object().keys({
    familyId: Joi.string().required(),
  }),
};

module.exports = {
  createFamily,
  getFamily,
  updateFamily,
  deleteFamily,
};
