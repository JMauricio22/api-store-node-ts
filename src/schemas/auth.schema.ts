import * as Joi from 'joi';

const email = Joi.string().email();
const newPassword = Joi.string();
const token = Joi.string();

export const emailRecovery = Joi.object({
  email: email.required(),
});

export const changePassword = Joi.object({
  newPassword: newPassword.required(),
  token: token.required(),
});
