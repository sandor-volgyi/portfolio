import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/httpException';
import { commentService } from '../services';

export const commentController = {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    const comments = await commentService.get().catch(error => {
      next(new HttpException(error.errorStatus, error.errorMessage));
    });
    if (comments) {
      res.status(200).json(comments);
    }
  },
};
