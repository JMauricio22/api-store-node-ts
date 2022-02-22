import Joi from 'joi';

const limit = Joi.number().integer();
const offset = Joi.number().integer();

export const paginationSchema = Joi.object({
  limit,
  offset,
});
