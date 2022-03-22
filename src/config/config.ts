import dotenv from 'dotenv';

dotenv.config();

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtRecoverySecret: process.env.JWT_RECOVERY_SECRET,
};

export default config;
