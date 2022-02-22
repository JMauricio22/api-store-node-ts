import express from 'express';
import validationHandler from '../middlewares/validationHandler';
import {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} from '../schemas/customers.schema';
import CustomerService from '../services/customers.service';

const router = express.Router();

const customerService = new CustomerService();

router.get('/', async (req, res, next) => {
  try {
    const customers = await customerService.find();
    res.json({
      data: customers,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const customer = await customerService.create(body);
      res.json({
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body, params } = req;
      const customer = await customerService.update(params.id, body);
      res.json({
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await customerService.delete(id);
      res.json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
