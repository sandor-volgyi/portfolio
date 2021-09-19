import app from './app';
import config from './config';

const PORT = config.port || 3001;

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
