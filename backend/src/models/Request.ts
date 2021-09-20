import { UserPayLoad } from './User';

declare global {
  namespace Express {
    interface Request {
      user: UserPayLoad;
    }
  }
}
