import express from 'express';
import ProductsService from '../services/products.service';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryParams,
} from '../schemas/products.schema';
import validationHandler from '../middlewares/validationHandler';

const productService = new ProductsService();

const router = express.Router();

router.get(
  '/',
  validationHandler(queryParams, 'query'),
  async (req, res, next) => {
    try {
      const { query } = req;
      const products = await productService.find(query);
      res.json({
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validationHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const product = await productService.create(body);
      res.status(201).json({
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validationHandler(getProductSchema, 'params'),
  validationHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const product = await productService.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validationHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await productService.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
