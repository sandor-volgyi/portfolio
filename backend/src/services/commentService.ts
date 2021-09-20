import {
  badRequestError,
  internalServerError,
  notFoundError,
} from './errorService';
import { Comment } from '../models/Comment';

interface CommentResponse {
  comments: Comment[];
}

const get = async (): Promise<CommentResponse> => {
  const getComments = await Comment.getComments();
  if (!getComments) {
    throw notFoundError('Comments not found.');
  }
  return { comments: getComments };
};

export const commentService = {
  get,
};
