import {
  badRequestError,
  internalServerError,
  notFoundError,
} from './errorService';
import { Comment, CommentResponse } from '../models/Comment';

const get = async (): Promise<CommentResponse> => {
  const getComments = await Comment.getComments();
  if (!getComments) {
    throw notFoundError('Comments not found.');
  }
  return { comments: getComments };
};

const post = async (userId: number, comment: string): Promise<boolean> => {
  const postComment = await Comment.postComment(userId, comment);
  if (!postComment) {
    throw notFoundError('Comment was not added.');
  }
  return true;
};

export const commentService = {
  get,
  post,
};
