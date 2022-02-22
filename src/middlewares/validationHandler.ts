import Boom from '@hapi/boom';
import { Request, Response } from 'express';
import Joi from 'joi';

export default function validationHandler(
  schema: Joi.ObjectSchema<any>,
  property: string
) {
  return (req: Request, res: Response, next: (error?: Error) => void) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(Boom.badRequest('Bad Request', error));
    } else {
      next();
    }
  };
}
