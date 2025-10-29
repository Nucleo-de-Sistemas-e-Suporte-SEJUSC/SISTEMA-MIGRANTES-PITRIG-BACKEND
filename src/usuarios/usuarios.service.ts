import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Usuario } from '@prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async criarUsuario(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return this.prisma.usuario.create({ data });
  }

  async buscarUsuario(id: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async listarUsuarios(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async atualizarUsuario(
    id: number,
    data: Prisma.UsuarioUpdateInput,
  ): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async deletarUsuario(id: number): Promise<Usuario> {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
