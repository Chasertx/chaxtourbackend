import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

async function bootstrap() {
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
