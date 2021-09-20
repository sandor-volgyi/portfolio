import { notFoundError } from './errorService';
import { Comment, CommentResponse, userCanEdit } from '../models/Comment';

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

const del = async (
  userId: number,
  userRole: string,
  deleteId: number
): Promise<boolean> => {
  const getAuthorLevel = await Comment.getAuthor(deleteId);
  if (!getAuthorLevel) {
    throw notFoundError('Comment was not added.');
  }
  const canEdit = userCanEdit(
    getAuthorLevel[0].user_role,
    getAuthorLevel[0].user_id,
    userRole,
    userId
  );
  if (canEdit) {
    return await Comment.deleteComment(deleteId);
  } else {
    return false;
  }
};

export const commentService = {
  get,
  post,
  del,
};
