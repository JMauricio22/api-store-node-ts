import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import { QueryFailedError } from 'typeorm';

export function logErrors(
  error: Error,
  req: Request,
  res: Response,
  next: (error?: Error) => void
) {
  console.error(error);
  next(error);
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: () => void
) {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}
export function boomErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: (error?: Error) => void
) {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json({
      ...output.payload,
      ...error.data?.details,
    });
  } else {
    next(error);
  }
}

export function typeOrmQueryFailedErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: (error?: Error) => void
) {
  if (error instanceof QueryFailedError) {
    res.json({
      message: error.message,
    });
  } else {
    next(error);
  }
}

export function typeOrmValidationErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: (error?: Error) => void
) {
  if (Array.isArray(error) && error[0] instanceof ValidationError) {
    res.json({
      errors: error.map((err: ValidationError) => ({
        property: err.property,
        value: err.value,
        constraint: err.constraints,
      })),
    });
  } else {
    next(error);
  }
}
