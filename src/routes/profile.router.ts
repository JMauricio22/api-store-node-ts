import express from 'express';
import passport from 'passport';
import OrderService from '../services/orders.service';
import { checkRoles } from '../middlewares/auth.handler';

const productService = new OrderService();

const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt'),
  checkRoles('customer'),
  async (req, res, next) => {
    try {
      const { user } = req;
      const products = await productService.findOrderByUserId({
        userId: (user as any).sub,
      });
      res.json({
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
