import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module'; // <-- Importe aqui
import { AuthModule } from './auth/auth.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';

@Module({
  imports: [
    PrismaModule,
    UsuariosModule,
    AuthModule,
    AgendamentosModule, // <-- Adicione na lista de imports
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
