import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV == null || process.env.NODE_ENV === 'dev') {
    app.enableCors({
      origin: 'http://localhost:3001',
    });
  } else if (process.env.NODE_ENV === 'prod') {
    app.enableCors({
      origin:
        'http://http://nestjs-task-management-frontend-by-logeswaran.s3-website.ap-south-1.amazonaws.com/',
    });
  }

  app.useGlobalPipes(new ValidationPipe());
  const port: number = Number(process.env.PORT.toString()) || 3000;
  await app.listen(port);
}
bootstrap();
