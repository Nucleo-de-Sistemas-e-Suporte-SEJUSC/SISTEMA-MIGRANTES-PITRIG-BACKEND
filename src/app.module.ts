import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 👈 ADICIONA ISSO

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { MigrantesModule } from './migrantes/migrantes.module';
import { GruposFamiliaresModule } from './grupos-familiares/grupos-familiares.module';
import { AtendimentosModule } from './atendimentos/atendimentos.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 👈 ESSENCIAL
    }),

    PrismaModule,
    UsuariosModule,
    AuthModule,
    AgendamentosModule,
    MigrantesModule,
    GruposFamiliaresModule,
    AtendimentosModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}