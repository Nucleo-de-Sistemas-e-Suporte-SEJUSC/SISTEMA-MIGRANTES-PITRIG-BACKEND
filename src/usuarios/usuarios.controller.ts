import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch, // <-- 1. Importe o 'Patch' (ou 'Put')
  Delete, // <-- 1. Importe o 'Delete'
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto'; // <-- 1. Importe o UpdateUsuarioDto

@Controller('usuarios') // Rota base: /usuarios
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}
@Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    // Mude o nome do método aqui:
    return this.usuariosService.criarUsuario(createUsuarioDto);
  }
  /**
   * Rota: POST /usuarios
   */
  @Post()
  criar(@Body() createUsuarioDto: CreateUsuarioDto) {
    // <-- 2. Rota POST atualizada para chamar 'criarUsuario'
    return this.usuariosService.criarUsuario(createUsuarioDto);
  }

  /**
   * Rota: GET /usuarios
   */
  @Get()
  listarTodos() {
    // <-- 3. Rota GET (todos) atualizada para chamar 'listarUsuarios'
    return this.usuariosService.listarUsuarios();
  }

  /**
   * Rota: GET /usuarios/1 (ou /2, /3, etc.)
   */
  @Get(':id')
  buscarUm(@Param('id', ParseIntPipe) id: number) {
    // <-- 4. Rota GET (um) atualizada para chamar 'buscarUsuario'
    return this.usuariosService.buscarUsuario(id);
  }

  /**
   * Rota: PATCH /usuarios/1 (ou /2, /3, etc.)
   * Usamos PATCH para atualização parcial. Se fosse PUT,
   * idealmente esperaria o DTO completo.
   */
  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    // <-- 5. NOVA ROTA: PATCH para atualizar
    return this.usuariosService.atualizarUsuario(id, updateUsuarioDto);
  }

  /**
   * Rota: DELETE /usuarios/1 (ou /2, /3, etc.)
   */
  @Delete(':id')
  deletar(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.deletarUsuario(id);
  }
}
