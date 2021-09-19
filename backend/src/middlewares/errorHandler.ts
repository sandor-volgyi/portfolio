import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/httpException';

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    status: 'error',
    message,
  });
}

export default errorMiddleware;
