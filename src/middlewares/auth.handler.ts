import Boom from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User';

export function checkRoles(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (roles.includes((req.user as User).role)) {
      next();
    } else {
      next(Boom.forbidden());
    }
  };
}
