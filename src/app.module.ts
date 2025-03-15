import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { StocksService } from './stocks/stocks.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes env variables available across the app
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Uses DATABASE_URL from .env
      autoLoadEntities: true, // Automatically loads entities
      synchronize: process.env.NODE_ENV !== 'production', // ❗ Disable in production
    }),
    CacheModule.register({
      store: redisStore, // ✅ Correct way to use Redis as a store
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      ttl: 10, // Optional: Set default cache expiration time in seconds
    }),
    HttpModule,
  ],
  providers: [StocksService],
  exports: [StocksService],
})
export class AppModule {}
