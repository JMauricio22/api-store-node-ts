import Joi from 'joi';

const id = Joi.number();
const email = Joi.string().email();
const password = Joi.string();

export const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});

export const updateUserSchema = Joi.object({
  email,
  password,
});

export const getUserSchema = Joi.object({
  id: id.required(),
});
