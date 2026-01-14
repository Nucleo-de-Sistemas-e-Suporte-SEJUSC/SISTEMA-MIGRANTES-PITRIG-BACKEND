import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module'; // <-- Importe aqui
import { AuthModule } from './auth/auth.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { MigrantesModule } from './migrantes/migrantes.module';
import { GruposFamiliaresModule } from './grupos-familiares/grupos-familiares.module';
import { AtendimentosModule } from './atendimentos/atendimentos.module';

@Module({
  imports: [
    PrismaModule,
    UsuariosModule,
    AuthModule,
    AgendamentosModule,
    MigrantesModule,
    GruposFamiliaresModule,
    AtendimentosModule, // <-- Adicione na lista de imports
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
