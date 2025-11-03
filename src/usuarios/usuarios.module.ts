import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller'; // <-- Verifique se ele importou

@Module({
  controllers: [UsuariosController], // <-- Verifique se ele está aqui
  providers: [UsuariosService],
  exports: [UsuariosService], // Boa prática exportar o service
})
export class UsuariosModule {}