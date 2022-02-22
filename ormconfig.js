module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mau',
  password: 'admin123',
  database: 'my_store',
  synchronize: true,
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities',
  },
};
