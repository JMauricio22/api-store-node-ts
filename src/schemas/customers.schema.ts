import Joi from 'joi';

const id = Joi.number();
const firstName = Joi.string();
const lastName = Joi.string();
const phone = Joi.string();
const email = Joi.string().email();
const password = Joi.string();
const role = Joi.string().valid('admin', 'customer', 'seller');

export const createCustomerSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
    role: role.required(),
  }).required(),
});

export const updateCustomerSchema = Joi.object({
  firstName: firstName,
  lastName: lastName,
  phone: phone,
  user: Joi.object({
    email: email,
    password: password,
    role,
  }),
});

export const getCustomerSchema = Joi.object({
  id: id.required(),
});
