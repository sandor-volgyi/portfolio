import { db } from '../db/connection';
import { notFoundError } from '../services/errorService';

export interface CommentResponse {
  comments: Comment[];
}

export interface CommentBody {
  comment: string;
}

export interface SqlResultPostComment {
  results: {
    insertId: number;
  };
  fields: unknown[];
}

export interface Comment {
  id: number;
  user_id: number;
  user_name: string;
  user_role: string;
  created_on: number;
  edited_on: number | null;
  comment: string;
}

export interface SqlResultComment {
  results: Array<Comment>;
  fields: Array<unknown>;
}

export const Comment = {
  getComments: async (): Promise<Comment[]> => {
    const getAllComment = `
        SELECT c.*, u.username as user_name, m.meta_value as user_role
        FROM comment c 
        LEFT JOIN user u 
        ON c.user_id = u.id 
        LEFT JOIN usermeta m
        ON c.user_id = m.user_id
        WHERE m.meta_key = "role"
        ORDER BY id 
        DESC`;
    const returnComments: SqlResultComment = await (db.query(
      getAllComment
    ) as unknown as SqlResultComment);

    if (!returnComments || !returnComments.results[0]) {
      throw notFoundError('Comment not found');
    } else {
      return returnComments.results;
    }
  },
  postComment: async (userId: number, comment: string): Promise<number> => {
    const postComment = `
      INSERT INTO comment ( user_id, created_on, comment) VALUES ( ?,UNIX_TIMESTAMP(),?)`;

    const postMyComment = await (db.query(postComment, [
      userId,
      comment,
    ]) as unknown as SqlResultPostComment);

    if (!postMyComment.results) throw notFoundError('Unable to save building');
    return postMyComment.results.insertId;
  },
};
