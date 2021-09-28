import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // local.../api/...
  app.setGlobalPrefix('api');

  await app.listen(8888);
}
bootstrap();
