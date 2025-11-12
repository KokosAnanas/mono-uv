import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // общий префикс API
  app.setGlobalPrefix('api');

  // CORS (фронт с того же IP)
  app.enableCors({ origin: true, credentials: true });

  // лимиты тела запроса
  app.use(json({ limit: '20mb' }));
  app.use(urlencoded({ extended: true, limit: '20mb' }));

  // раздача загруженных файлов
  app.use('/api/uploads', express.static(join(process.cwd(), 'uploads')));

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
