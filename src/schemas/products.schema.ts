import Joi from 'joi';
import { paginationSchema } from './pagination.schema';

const id = Joi.number();

const categoryId = Joi.number();

const name = Joi.string();

const description = Joi.string();

const image = Joi.string();

const price = Joi.number().precision(2);

const minPrice = Joi.number().precision(2);

const maxPrice = Joi.number().precision(2);

export const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  image: image.required(),
  price: price.required(),
  categoryId: categoryId.required(),
});

export const updateProductSchema = Joi.object({
  name,
  description,
  image,
  price,
  categoryId: categoryId.required(),
});

export const getProductSchema = Joi.object({
  id: id.required(),
});

export const queryParams = paginationSchema.append({
  price,
  minPrice: minPrice.when('maxPrice', {
    is: Joi.number().precision(2).exist(),
    then: Joi.required(),
  }),
  maxPrice,
});
