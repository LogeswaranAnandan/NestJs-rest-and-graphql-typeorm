import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  database: 'taskmanagement',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  // The .js file is included as it is finally compiled to javascript.
  entities: [__dirname + '/../**/*.entity.js'],
  logging: 'all',
  synchronize: true,
  retryAttempts: 1,
};
