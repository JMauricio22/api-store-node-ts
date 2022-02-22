import { Pool } from 'pg';
import config from '../config/config';

const USER = encodeURIComponent(config.DB_USER as string);
const PASSWORD = encodeURIComponent(config.DB_PASSWORD as string);

const URI = `postgres://${USER}:${PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;

const pool = new Pool({
  connectionString: URI,
});

// pool.on('error', (error) => {
//   console.log(error);
// });

export default pool;
