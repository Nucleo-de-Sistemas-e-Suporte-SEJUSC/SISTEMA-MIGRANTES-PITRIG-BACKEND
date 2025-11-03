import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async criarUsuario(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    // --- INÍCIO DA ATUALIZAÇÃO ---
    // 1. Verifica se já existe um usuário com este e-mail
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email: data.email },
    });

    // 2. Se existir, lança a exceção de conflito
    if (usuarioExistente) {
      throw new ConflictException('Já existe um usuário com este e-mail');
    }
    // --- FIM DA ATUALIZAÇÃO ---

    // --- Lógica da Imagem (Já estava correta) ---
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(data.senha, saltRounds);
    // --- Fim da Lógica da Imagem ---

    return this.prisma.usuario.create({
      data: {
        ...data,
        senha: senhaHash,
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

  // --- NOVO MÉTODO: findByEmail ---
  // Adicionado conforme a sugestão da imagem
  async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    // Adicionando tratamento de erro, similar ao seu 'buscarUsuario'
    if (!usuario) {
      throw new NotFoundException(
        `Usuário com e-mail ${email} não encontrado.`,
      );
    }

    return usuario;
  }
  // --- FIM DO NOVO MÉTODO ---

  async listarUsuarios(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async atualizarUsuario(
    id: number,
    data: Prisma.UsuarioUpdateInput,
  ): Promise<Usuario> {
    // Hashear a senha se ela estiver sendo atualizada
    if (data.senha && typeof data.senha === 'string') {
      const saltRounds = 10;
      data.senha = await bcrypt.hash(data.senha, saltRounds);
    }

    try {
      // Tentar atualizar diretamente
      return await this.prisma.usuario.update({
        where: { id },
        data,
      });
    } catch (error) {
      // --- INÍCIO DA CORREÇÃO (Completando o código) ---
      // 6. Capturar o erro P2025 do Prisma (Registro não encontrado)
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      }
      // Se for qualquer outro erro, simplesmente lança-o novamente
      throw error;
      // --- FIM DA CORREÇÃO ---
    }
  }

  // --- NOVO MÉTODO: deletarUsuario ---
  async deletarUsuario(id: number): Promise<Usuario> {
    try {
      return await this.prisma.usuario.delete({
        where: { id },
      });
    } catch (error) {
      // Reutilizando o mesmo padrão de tratamento de erro do seu
      // método 'atualizarUsuario' para consistência.
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
      }
      throw error;
    }
  }
  // --- FIM DO NOVO MÉTODO ---
}
