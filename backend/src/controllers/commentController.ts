import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/httpException';
import { commentService } from '../services';
import { CommentBody } from '../models/Comment';

export const commentController = {
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    const comments = await commentService.get().catch(error => {
      next(new HttpException(error.errorStatus, error.errorMessage));
    });
    if (comments) {
      res.status(200).json(comments);
    }
  },
  /* async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const comments = await commentService.delete().catch(error => {
      next(new HttpException(error.errorStatus, error.errorMessage));
    });
    if (comments) {
      res.status(200).json(comments);
    }
  },/
  /*
  async put(req: Request, res: Response, next: NextFunction): Promise<void> {
    const comments = await commentService.delete().catch(error => {
      next(new HttpException(error.errorStatus, error.errorMessage));
    });
    if (comments) {
      res.status(200).json(comments);
    }
  },*/
  async post(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user.userId;
    const comment = req.body.comment;
    const userRole = req.user.userRole;
    if (
      userRole === 'member' ||
      userRole === 'admin' ||
      userRole === 'moderator'
    ) {
      const postComment = await commentService
        .post(userId, comment)
        .catch(error => {
          next(new HttpException(error.errorStatus, error.errorMessage));
        });
      if (postComment) {
        res.status(200).json(postComment);
      }
    } else {
      next(
        new HttpException(401, 'User role not authorized for comment posting')
      );
    }
  },
};
