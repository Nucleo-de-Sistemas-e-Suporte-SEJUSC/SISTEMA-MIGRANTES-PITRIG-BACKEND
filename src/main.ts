import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- 1. Importe o ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- INÍCIO DA ADIÇÃO ---
  // 2. Habilite o ValidationPipe globalmente
  // Isso fará com que o NestJS valide automaticamente
  // todos os DTOs que chegam nos seus controllers.
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * Remove propriedades que não estão no DTO.
       * (Segurança: impede que campos extras sejam passados)
       */
      whitelist: true,

      /**
       * Lança um erro se propriedades extras forem enviadas.
       * (Mais seguro que apenas remover com 'whitelist')
       */
      forbidNonWhitelisted: true,

      /**
       * Transforma os tipos dos dados recebidos para os tipos
       * esperados no DTO (ex: string da URL para number).
       */
      transform: true,
    }),
  );
  // --- FIM DA ADIÇÃO ---

  // Você pode estar usando uma variável de ambiente para a porta,
  // o que é uma ótima prática.
  await app.listen(process.env.PORT || 3000);
}
bootstrap();