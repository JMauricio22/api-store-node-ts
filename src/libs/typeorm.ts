import { createConnection } from 'typeorm';
import config from '../config/config';

export async function connect() {
  try {
    const options: any = {
      type: 'postgres',
      url: config.DATABASE_URL,
      entities: ['src/entities/**/*.ts'],
      migrations: ['src/migrations/**/*.ts'],
      cli: {
        migrationsDir: 'src/migrations',
        entitiesDir: 'src/entities',
      },
    };

    if (config.NODE_ENV === 'production') {
      options.extra = {
        ssl: {
          rejectUnauthorized: false,
        },
      };
    }

    await createConnection(options);
    console.log('Connection successfully');
  } catch (error) {
    console.log(error);
  }
}
