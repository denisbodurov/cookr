import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true});

  // Validation setup
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  // Swagger setup
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setBasePath('api/v1')
    .setTitle('Cookr API')
    .setDescription('Cookr API description')
    .setVersion('1.0')
    .addTag('cookr')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
