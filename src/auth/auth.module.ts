import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; // 1. IMPORTE O PASSPORT
import { JwtStrategy } from './jwt.strategy'; // 2. IMPORTE A ESTRATÉGIA

@Module({
  imports: [
    forwardRef(() => UsuariosModule),
    PassportModule.register({ defaultStrategy: 'jwt' }), // 3. ADICIONE O PASSPORTMODULE
    JwtModule.register({
      global: true,
      secret: 'pitrig_secret_2024', // !! Use o mesmo segredo do jwt.strategy !!
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // 4. ADICIONE A JwtStrategy AOS PROVIDERS
  exports: [AuthService, JwtStrategy, PassportModule], // 5. EXPORTE A ESTRATÉGIA E O PASSPORT
})
export class AuthModule {}
