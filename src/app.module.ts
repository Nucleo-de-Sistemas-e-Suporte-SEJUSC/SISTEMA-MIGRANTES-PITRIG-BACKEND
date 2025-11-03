// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module'; // <-- Importe aqui
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    UsuariosModule,
    AuthModule, // <-- Adicione na lista de imports
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
