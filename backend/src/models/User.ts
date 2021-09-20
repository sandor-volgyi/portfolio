import { db } from '../db/connection';
import { notFoundError, internalServerError } from '../services/errorService';

export interface UserPayLoad {
  userId: number;
  userName: string;
  userRole: string;
}

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

    if (!returnedUser || !returnedUser.results[0]) {
      throw notFoundError('Username not found');
    } else {
      return returnedUser.results[0];
    }
  },
  isExistingUser: async (username: string): Promise<boolean> => {
    const selectUser = `SELECT username 
      FROM user 
      WHERE username = ?`;
    const returnedUser: SqlResultUser = await (db.query(selectUser, [
      username,
    ]) as unknown as SqlResultUser);

    if (!returnedUser || !returnedUser.results[0]) {
      return false;
    } else {
      return true;
    }
  },

  registerUser: async (
    username: string,
    password: string,
    role: string
  ): Promise<UserData> => {
    const query = `INSERT INTO user (username, password) VALUES ( ?, ?)`;
    const insertUser: any = await (db.query(query, [
      username,
      password,
    ]) as unknown as SqlResultUser);

    if (!insertUser) {
      throw internalServerError('Could not insert user');
    }

    const userId = insertUser.results.insertId;

    const query2 = `INSERT INTO usermeta (user_id,meta_key,meta_value) VALUES ( ?, ?, ? )`;
    const setUserRole: any = await (db.query(query2, [
      userId,
      'role',
      'member',
    ]) as unknown as SqlResultUser);

    if (!setUserRole) {
      throw internalServerError('Could not set role');
    }

    return {
      id: userId,
      username: username,
      meta_key: 'role',
      meta_value: 'member',
    };
  },
};
