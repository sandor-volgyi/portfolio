import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/httpException';
import { userService } from '../services';

export const userController = {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { username, password } = req.body;
    const data = await userService.login(username, password).catch(error => {
      next(new HttpException(error.errorStatus, error.errorMessage));
    });
    if (data) {
      res.status(200).json(data);
    }
  },
};
