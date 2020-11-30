import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';

export const getTypeOrmConfig = () => {
  const typeormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // The .js file is included as it is finally compiled to javascript.
    entities: [__dirname + '/../**/*.entity.js'],
    logging: [
      'query',
      'error',
      'warn',
      'info',
      'log',
      'migration',
    ] as LoggerOptions,
    synchronize: true,
  };

  return typeormConfig;
};
