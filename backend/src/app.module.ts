import { HealthModule } from './health/health.module';
import { Module } from '@nestjs/common';
import {UsersModule} from "./controllers/users/users.module";
import {MongooseModule} from "@nestjs/mongoose";
import {NoticesModule} from "./controllers/notices/notices.module";
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    HealthModule,    
    UsersModule,
    NoticesModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI
      ?? process.env.DATABASE_URL
      ?? 'mongodb://mongo:27017/uvedb?authSource=admin',
    ),
    ],
})
export class AppModule {}
