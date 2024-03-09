const Joi = require('joi');

const createItem = {
  body: Joi.object().keys({
    familyId: Joi.string().required(),
    name: Joi.string().required(),
    quantity: Joi.number().optional(),
    expiresAt: Joi.date().optional(),
    fooDBKey: Joi.string().optional(),
  }),
};

const getItem = {
  params: Joi.object().keys({
    itemId: Joi.string().required(),
  }),
};

const updateItem = {
  body: Joi.object().keys({
    familyId: Joi.string(),
    name: Joi.string(),
    quantity: Joi.number(),
    expiresAt: Joi.date(),
    fooDBKey: Joi.string(),
  }),

  params: Joi.object().keys({
    itemId: Joi.string().required(),
  }),
};

const deleteItem = {
  params: Joi.object().keys({
    itemId: Joi.string().required(),
  }),
};

module.exports = {
  createItem,
  getItem,
  updateItem,
  deleteItem,
};
