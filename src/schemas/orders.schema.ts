import Joi from 'joi';

const id = Joi.number().integer();

export const getOrderSchema = Joi.object({
  id: id.required(),
});

export const addItemToOrderSchema = Joi.object({
  orderId: id.required(),
  productId: id.required(),
  quantity: Joi.number().integer().required(),
});
