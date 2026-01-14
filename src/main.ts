import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // 1. Importe o Swagger

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. Configuração da Documentação Visual
  const config = new DocumentBuilder()
    .setTitle('Sistema PITRIG - API Documentation')
    .setDescription('Documentação detalhada das rotas do backend do sistema de gestão de migrantes.')
    .setVersion('1.0')
    .addBearerAuth() // Adiciona suporte ao Token JWT no Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Define que o link será /api

  await app.listen(3000);
}
bootstrap();