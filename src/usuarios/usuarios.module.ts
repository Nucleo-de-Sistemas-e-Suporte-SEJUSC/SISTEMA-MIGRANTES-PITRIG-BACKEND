import { Module, forwardRef } from '@nestjs/common'; // 1. Importe forwardRef
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module'; // 2. Importe o AuthModule

@Module({
  imports: [
    PrismaModule,
    // 3. Envolva o AuthModule com forwardRef
    forwardRef(() => AuthModule),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
