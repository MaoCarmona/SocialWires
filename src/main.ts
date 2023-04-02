import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // carga las variables de entorno
  console.log(process.env.DB_PASSWORD)
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();