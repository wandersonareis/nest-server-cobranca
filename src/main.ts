import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import {
  ValidationException,
  ValidationFilter,
} from './filters/validation.filter';

declare const module: any;

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT') || 8000;

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalFilters(new ValidationFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errMsg: Record<string, any> = {};
        errors.forEach((err) => {
          if (!err.constraints) return;
          errMsg[err.property] = Object.values(err.constraints);
        });
        return new ValidationException(errMsg);
      },
    }),
  );

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
