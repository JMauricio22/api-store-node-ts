import Joi from 'joi';

const id = Joi.number();
const name = Joi.string();

export const createCategorySchema = Joi.object({
  name: name.required(),
});

export const updateCategorySchema = Joi.object({
  name,
});

export const getCategorySchema = Joi.object({
  id: id.required(),
});
