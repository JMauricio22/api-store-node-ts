import { Router } from 'express';
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import Boom from '@hapi/boom';

const router = Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req: Request, res: Response) => {
    console.log('Auth function...');
    try {
      res.json(req.user);
    } catch (error) {
      res.json(Boom.internal().output);
    }
  }
);

export default router;
