import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = () => {
  const typeormConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    // username: process.env.DB_USERNAME,
    // password: process.env.DB_PASSWORD,
    // url: 'mongodb://localhost:27017/?readPreference=primary&ssl=false',
    // The .js file is included as it is finally compiled to javascript.
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    logging: true,
    synchronize: true,
    useUnifiedTopology: true,
  };

  return typeormConfig;
};
