import express from 'express';
import errorHandler from './middlewares/errorHandler';

import { system, api } from './routes';

const app = express();

app.use('/api', api);
app.use('/system', system);
app.use(errorHandler);

export default app;
