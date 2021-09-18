import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  mysql: {
    host: process.env.db_host || '',
    user: process.env.db_user || '',
    password: process.env.db_password || '',
    database: process.env.db_name || '',
  },
};
