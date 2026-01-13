import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import * as express from 'express';
import { join } from 'path';

/**
 * Точка входа приложения NestJS
 * @see https://docs.nestjs.com/first-steps
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Общий префикс API для всех эндпоинтов
  // @see https://docs.nestjs.com/faq/global-prefix
  app.setGlobalPrefix('api');

  // Глобальный ValidationPipe для автоматической валидации DTO
  // @see https://docs.nestjs.com/techniques/validation#auto-validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Удаляет свойства, не описанные в DTO
      forbidNonWhitelisted: true, // Выбрасывает ошибку при наличии лишних свойств
      transform: true,           // Автоматически преобразует типы (string -> number и т.д.)
    }),
  );

  // CORS для фронтенда
  // @see https://docs.nestjs.com/security/cors
  app.enableCors({ origin: true, credentials: true });

  // Лимиты тела запроса (для загрузки файлов)
  app.use(json({ limit: '20mb' }));
  app.use(urlencoded({ extended: true, limit: '20mb' }));

  // Раздача загруженных файлов как статики
  // @see https://docs.nestjs.com/recipes/serve-static
  app.use('/api/uploads', express.static(join(process.cwd(), 'uploads')));

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
