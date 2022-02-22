import dotenv from 'dotenv';

dotenv.config();

const config = {
  NODE_ENV: process.env.ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL,
};

export default config;
