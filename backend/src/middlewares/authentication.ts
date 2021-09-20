import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayLoad } from '../models/User';
import { unauthorizedError } from '../services/errorService';
import HttpException from '../exceptions/httpException';
import { isGeneralError } from '../services/errorService';

export const authenticateRequest = function (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token: string | undefined = authHeader && authHeader.split(' ')[1];
  try {
    if (token == null) throw unauthorizedError('Invalid token.');

    jwt.verify(
      token,
      process.env.JWT_SECRETKEY as string,
      function (err, userData) {
        if (err || !userData) throw unauthorizedError('Invalid token');
        if (userData) {
          if (!('userId' in userData) || !('kingdomId' in userData))
            throw unauthorizedError(
              'User details are missing. Please try to re-login!'
            );

          const userAuthData: UserPayLoad = {
            userId: +(userData as UserPayLoad).userId,
            userName: (userData as UserPayLoad).userName.trim(),
            userRole: (userData as UserPayLoad).userRole.trim(),
          };

          if (
            isNaN(userAuthData.userId) ||
            userAuthData.userId < 1 ||
            userAuthData.userId !== Math.floor(userAuthData.userId) ||
            userAuthData.userName.length < 1 ||
            userAuthData.userRole.length < 1
          ) {
            throw unauthorizedError(
              'User details are not acceptable. Please try to re-login!'
            );
          }

          req.user = userAuthData;
        }
        next();
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      next(new HttpException(401, error.message));
    } else if (error) {
      if (isGeneralError(error)) {
        next(new HttpException(error.errorStatus, error.errorMessage));
      }
    } else {
      next(new HttpException(401, 'Cannot authenticate request.'));
    }
  }
};
