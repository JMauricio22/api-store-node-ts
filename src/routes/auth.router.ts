import { Router } from 'express';
import passport from 'passport';
import { Request, Response } from 'express';
import Boom from '@hapi/boom';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import Config from '../config/config';

const router = Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req: Request, res: Response) => {
    try {
      let { user } = req;
      const payload = {
        sub: (user as User).id,
        role: (user as User).role,
      };
      const token = jwt.sign(payload, Config.jwtSecret as string);
      res.json({
        user,
        token,
      });
    } catch (error) {
      res.json(Boom.internal().output);
    }
  }
);

export default router;
