// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module'; // <-- Importe aqui

@Module({
  imports: [
    PrismaModule,
    UsuariosModule, // <-- Adicione na lista de imports
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
