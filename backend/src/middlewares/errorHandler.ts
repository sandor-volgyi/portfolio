import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/httpException';
import { GeneralError } from '../services/errorService';

function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  let message = error.message;

  response.status(status).send({ status: 'error', message: message });
}

export default errorMiddleware;
