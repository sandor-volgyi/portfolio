import express from 'express';
import config from './config';

const PORT = config.port || 3001;
const app = express();

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
