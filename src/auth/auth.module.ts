import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsuariosModule, // Para termos acesso ao UsuariosService
    PassportModule,
    JwtModule.register({
      secret: 'SEU_SEGREDO_SUPER_SECRETO', // Mude isso! Coloque no .env depois
      signOptions: { expiresIn: '60m' }, // Token expira em 60 minutos
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], // Precisamos adicionar as "Estratégias" aqui depois
})
export class AuthModule {}