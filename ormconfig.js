const parse = require('pg-connection-string').parse;
const dotenv = require('dotenv');

dotenv.config();

const postgresConfig = parse(process.env.DATABASE_URL);

module.exports = {
  type: 'postgres',
  host: postgresConfig.host,
  port: postgresConfig.port,
  username: postgresConfig.user,
  password: postgresConfig.password,
  database: postgresConfig.database,
  synchronize: true,
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities',
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
