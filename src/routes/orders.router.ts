import express from 'express';
import passport from 'passport';
import validationHandler from '../middlewares/validationHandler';
import { getOrderSchema, addItemToOrderSchema } from '../schemas/orders.schema';
import OrderService from '../services/orders.service';
import { checkRoles } from '../middlewares/auth.handler';
import { User } from '../entities/User';

const router = express.Router();

const orderService = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await orderService.find();
    res.json({
      data: orders,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  passport.authenticate('jwt'),
  checkRoles('customer'),
  async (req, res, next) => {
    try {
      const { user } = req;
      const order = await orderService.create({
        userId: (user as any).sub,
      });
      res.json({
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  passport.authenticate('jwt'),
  checkRoles('customer'),
  validationHandler(addItemToOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { body } = req;
      const item = await orderService.addItemToOrder(body);
      res.json({
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validationHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await orderService.delete(id);
      res.json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
