import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Prisma, Usuario } from '@prisma/client';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  criar(@Body() data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return this.usuariosService.criarUsuario(data);
  }

  @Get()
  listar(): Promise<Usuario[]> {
    return this.usuariosService.listarUsuarios();
  }

  @Get(':id')
  buscar(@Param('id') id: string): Promise<Usuario | null> {
    return this.usuariosService.buscarUsuario(Number(id));
  }

  @Put(':id')
  atualizar(
    @Param('id') id: string,
    @Body() data: Prisma.UsuarioUpdateInput,
  ): Promise<Usuario> {
    return this.usuariosService.atualizarUsuario(Number(id), data);
  }

  @Delete(':id')
  deletar(@Param('id') id: string): Promise<Usuario> {
    return this.usuariosService.deletarUsuario(Number(id));
  }
}
