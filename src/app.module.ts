import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { getTypeOrmConfig } from './configs/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

const getEnvFilePath = (): string => {
  const currentEnv: string = process.env.NODE_ENV?.toString().trim();
  console.log('-----------------------------------');
  console.log(currentEnv);
  console.log('-----------------------------------');
  const basePath = `./env-config`;
  const currentPath =
    currentEnv == null ? `${basePath}/.env` : `${basePath}/.${currentEnv}.env`;

  console.log('-----------------------------------');
  console.log(currentPath);
  console.log('-----------------------------------');
  return currentPath;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
    }),
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    TasksModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
