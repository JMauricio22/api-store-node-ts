import Joi from 'joi';

const id = Joi.number();
const email = Joi.string().email();
const password = Joi.string();
const role = Joi.string().valid('admin', 'customer', 'seller');

export const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

export const updateUserSchema = Joi.object({
  email,
  password,
  role,
});

export const getUserSchema = Joi.object({
  id: id.required(),
});
