import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Libera requisições do frontend
  app.enableCors();

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema PITRIG - API Documentation')
    .setDescription(
      'Documentação detalhada das rotas do backend do sistema de gestão de migrantes.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
