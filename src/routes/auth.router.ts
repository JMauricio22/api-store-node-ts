import { Router } from 'express';
import passport from 'passport';
import { Request, Response } from 'express';
import Boom from '@hapi/boom';
import { User } from '../entities/User';
import AuthService from '../services/auth.service';
import { emailRecovery, changePassword } from '../schemas/auth.schema';
import validationHandler from '../middlewares/validationHandler';

const router = Router();

const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req: Request, res: Response) => {
    try {
      const { user } = req;
      res.json(
        service.signToken({
          id: (user as User).id,
          role: (user as User).role,
        })
      );
    } catch (error) {
      res.json(Boom.internal().output);
    }
  }
);

router.post(
  '/recovery',
  validationHandler(emailRecovery, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.recoveryPassword(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/change-password',
  validationHandler(changePassword, 'body'),
  async (req, res, next) => {
    try {
      const { newPassword, token } = req.body;
      const rta = await service.changePassword(newPassword, token);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
