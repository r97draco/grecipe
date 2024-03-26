const Joi = require('joi');

const createFamily = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    members: Joi.array().items(Joi.string().required()),
    isFamilyHead: Joi.boolean().optional(),
    userId: Joi.string().optional(),
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
    isFamilyHead: Joi.boolean(),
    userId: Joi.string(),
    action: Joi.string(),
    memberId: Joi.string(),
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
