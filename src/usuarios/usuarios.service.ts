import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Usuario, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async criarUsuario(dto: CreateUsuarioDto): Promise<Usuario> {
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (usuarioExistente) {
      throw new ConflictException('Já existe um usuário com este e-mail');
    }

    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(dto.senha, saltRounds);

    return this.prisma.usuario.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        senha: senhaHash,
        role: dto.role, // Vamos usar o 'role' que vem do DTO
      },
    });
  }

  async buscarUsuario(id: number): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com e-mail ${email} não encontrado.`,
      );
    }

    return usuario;
  }
  async listarUsuarios(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async atualizarUsuario(
    id: number,
    data: Prisma.UsuarioUpdateInput,
  ): Promise<Usuario> {
    if (data.senha && typeof data.senha === 'string') {
      const saltRounds = 10;
      data.senha = await bcrypt.hash(data.senha, saltRounds);
    }

    try {
      return await this.prisma.usuario.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      }
      throw error;
    }
  }

  async deletarUsuario(id: number): Promise<Usuario> {
    try {
      return await this.prisma.usuario.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // 1. Você precisava de um bloco {} para o 'if'
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      }
      // 2. Você precisava relançar o erro se não fosse o 'P2025'
      throw error;
    }
  }
}
