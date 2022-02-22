import Joi from 'joi';

const id = Joi.number().integer();
const customerId = Joi.number().integer();

export const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

export const getOrderSchema = Joi.object({
  id: id.required(),
});

export const addItemToOrderSchema = Joi.object({
  orderId: id.required(),
  productId: id.required(),
  quantity: Joi.number().integer().required(),
});
