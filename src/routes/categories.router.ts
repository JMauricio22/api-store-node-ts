import express from 'express';
import validationHandler from '../middlewares/validationHandler';
import {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} from '../schemas/categories.schema';
import CategoryService from '../services/categories.service';

const router = express.Router();

const categoryService = new CategoryService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await categoryService.find();
    res.json({
      data: categories,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validationHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const category = await categoryService.create(body);
      res.json({
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validationHandler(getCategorySchema, 'params'),
  validationHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { body, params } = req;
      const category = await categoryService.update(params.id, body);
      res.json({
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validationHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { params } = req;
      const result = await categoryService.delete(params.id);
      res.json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
