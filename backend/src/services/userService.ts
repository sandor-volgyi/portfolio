import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcryptjs';
import { LoginResponse } from '../models/Login';
import {
  badRequestError,
  notAcceptableError,
  unauthorizedError,
  ConflictError,
  internalServerError,
} from './errorService';
import { User, UserData } from '../models/User';

const register = async (username: string, password: string): Promise<any> => {
  validate(username, password);
  const role = 'member';
  const dbPassword = hashSync(password, 10);
  let myError = 'Unkown error happened';
  const checkUser = await User.isExistingUser(username);
  if (checkUser) {
    throw badRequestError('Username is already taken');
  }
  const user = await User.registerUser(username, dbPassword, role);
  if (!user) {
    throw internalServerError('Registration failed.');
  }
  return signToken(user);
};

const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  username = username.trim();
  password = password.trim();
  validate(username, password);
  const user = await User.getUserDetails(username);
  if (!user || !compareSync(password, user.password || '')) {
    throw unauthorizedError('Username or password is incorrect.');
  }
  return signToken(user);
};

function validate(username: string, password: string) {
  if (!username && !password) {
    throw badRequestError('Username and password is required.');
  } else if (!username) {
    throw badRequestError('Username is required.');
  } else if (!password) {
    throw badRequestError('Password is required.');
  } else if (password.length < 8) {
    throw notAcceptableError('Password must be at least 8 characters.');
  }
}

function signToken(user: UserData): LoginResponse {
  const token = jwt.sign(
    {
      userId: user.id,
      userName: user.username,
      userRole: user.meta_value,
    },
    process.env.JWT_SECRETKEY as string,
    {
      expiresIn: '1h',
    }
  );
  return {
    status: 'ok',
    token,
  };
}

export const userService = {
  login,
  validate,
  register,
};
