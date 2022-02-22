import express, { Application } from 'express';
import productsRouter from './products.routes';
import categoriesRouter from './categories.router';
import usersRouter from './users.router';
import customersRouter from './customers.router';
import ordersRouter from './orders.router';

function routerApi(app: Application) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
}

export default routerApi;
