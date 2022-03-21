import Boom from '@hapi/boom';

export function isAuthenticated(req, res, next) {
  const apiKey = '123';
  if (req.headers['api'] === apiKey) {
    next();
  } else {
    next(Boom.unauthorized());
  }
}
