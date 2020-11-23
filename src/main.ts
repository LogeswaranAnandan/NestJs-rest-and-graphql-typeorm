import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { Logform } from 'winston';

import { AppModule } from './app.module';

async function bootstrap() {
  const customLogFormatter = winston.format(
    (data: Logform.TransformableInfo, opts) => {
      const { context, level, message, timestamp } = data;

      // Appending entire data object as it includes some hidden variables being used under the hood.
      const test: Logform.TransformableInfo = {
        ...data,
        message: `[${context} ${timestamp}] ${message}`,
      };
      delete test.timestamp;
      delete test.context;

      return test;
    },
  );

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        customLogFormatter(),
        winston.format.simple(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'test-log.log',
        }),
      ],
    }),
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
