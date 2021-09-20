import express from 'express';
import errorHandler from './middlewares/errorHandler';
import { UserPayLoad } from './models/User';
import { system, api } from './routes';

const app = express();

declare global {
  namespace Express {
    interface Request {
      user: UserPayLoad;
    }
  }
}

app.use('/api', api);
app.use('/system', system);
app.use(errorHandler);

export default app;
