import { db } from '../db/connection';
import { notFoundError } from '../services/errorService';

export interface UserData {
  id: number;
  username: string;
  password?: string;
  metaID?: number;
  meta_key?: string;
  meta_value?: string;
}

export interface SqlResultUser {
  results: Array<UserData>;
  fields: Array<unknown>;
}

export const User = {
  getUserDetails: async (username: string): Promise<UserData> => {
    const selectUser = `SELECT u.id, 
              u.username, 
              u.password,
              m.umeta_id as "metaID", 
              m.meta_key, 
              m.meta_value 
      FROM user u 
      LEFT JOIN usermeta m 
      ON u.id=m.umeta_id 
      WHERE username = ? 
      AND meta_key = "role"`;
    const returnedUser: SqlResultUser = await (db.query(selectUser, [
      username,
    ]) as unknown as SqlResultUser);

    if (!returnedUser) {
      throw notFoundError('Username not found');
    } else {
      return returnedUser.results[0];
    }
  },
};
