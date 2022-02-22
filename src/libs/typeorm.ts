import { createConnection } from 'typeorm';
import config from '../config/config';

export async function connect() {
  try {
    await createConnection({
      type: 'postgres',
      url: config.DATABASE_URL,
      entities: ['src/entities/**/*.ts'],
      migrations: ['src/migrations/**/*.ts'],
      cli: {
        migrationsDir: 'src/migrations',
        entitiesDir: 'src/entities',
      },
    });
    console.log('Connection successfully');
  } catch (error) {
    console.log(error);
  }
}
