import { Module, forwardRef } from '@nestjs/common'; // 1. Importe forwardRef
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // 2. Envolva o UsuariosModule com forwardRef
    forwardRef(() => UsuariosModule),

    JwtModule.register({
      global: true,
      secret: 'SEU_SEGREDO_SUPER_SECRETO_AQUI',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  // 3. Se o UsuariosModule precisar usar o AuthService, exporte-o
  exports: [AuthService],
})
export class AuthModule {}
