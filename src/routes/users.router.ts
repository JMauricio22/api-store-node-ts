import { Router } from 'express';
import UserService from '../services/users.service';
import validationHandler from '../middlewares/validationHandler';
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} from '../schemas/user.schema';

const userService = new UserService();

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const tasks = await userService.find();
    return res.json({ data: tasks });
  } catch (error: any) {
    next(error);
  }
});

router.post(
  '/',
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = await userService.create(req.body);
      return res.json({
        data: user,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validationHandler(getUserSchema, 'params'),
  validationHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const result = await userService.update(id, body);
      return res.json({
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validationHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await userService.delete(id);
      return res.json({
        data: result,
      });
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
