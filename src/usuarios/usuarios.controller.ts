import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe, // Importante para validar os IDs da URL
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
// import { Prisma } from '@prisma/client'; // <-- Não precisamos mais disto para o @Body
import { CreateUsuarioDto } from './dto/create-usuario.dto'; // <-- 1. Importe o Create DTO
import { UpdateUsuarioDto } from './dto/update-usuario.dto'; // <-- 2. Importe o Update DTO

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  /**
   * Rota para criar um novo usuário.
   * POST /usuarios
   */
  @Post()
  criarUsuario(
    @Body() createUsuarioDto: CreateUsuarioDto, // <-- 3. Use o DTO aqui
  ) {
    // Se a requisição chegar aqui, os dados em 'createUsuarioDto'
    // já foram validados pelo ValidationPipe!
    // (Ex: e-mail válido, senha com min. 6 caracteres)
    return this.usuariosService.criarUsuario(createUsuarioDto);
  }

  /**
   * Rota para listar todos os usuários.
   * GET /usuarios
   */
  @Get()
  listarUsuarios() {
    return this.usuariosService.listarUsuarios();
  }

  /**
   * Rota para buscar um usuário pelo ID.
   * GET /usuarios/:id
   */
  @Get(':id')
  buscarUsuario(
    @Param('id', ParseIntPipe) id: number, // Valida que o ID é um número
  ) {
    return this.usuariosService.buscarUsuario(id);
  }

  /**
   * Rota para atualizar um usuário pelo ID.
   * PATCH /usuarios/:id
   */
  @Patch(':id')
  atualizarUsuario(
    @Param('id', ParseIntPipe) id: number, // Valida o ID
    @Body() updateUsuarioDto: UpdateUsuarioDto, // <-- 4. Use o DTO aqui
  ) {
    // 'updateUsuarioDto' também é validado (campos opcionais)
    return this.usuariosService.atualizarUsuario(id, updateUsuarioDto);
  }

  /**
   * Rota para deletar um usuário pelo ID.
   * DELETE /usuarios/:id
   */
  @Delete(':id')
  deletarUsuario(
    @Param('id', ParseIntPipe) id: number, // Valida o ID
  ) {
    return this.usuariosService.deletarUsuario(id);
  }
}