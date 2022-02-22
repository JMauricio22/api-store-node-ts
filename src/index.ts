import express from 'express';
import routerApi from './routes/index';
import {
  logErrors,
  errorHandler,
  boomErrorHandler,
  typeOrmValidationErrorHandler,
  typeOrmQueryFailedErrorHandler,
} from './middlewares/error.handler';
import { connect } from './libs/typeorm';
import 'reflect-metadata';

connect();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(typeOrmQueryFailedErrorHandler);
app.use(typeOrmValidationErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening in http://localhost:${port}`);
});
