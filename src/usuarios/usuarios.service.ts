import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto'; // Verifique se o caminho está certo
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  // 1. Criar Usuário (Com criptografia de senha)
  async create(dto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(dto.senha, 10);

    return this.prisma.usuario.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        senha: hashedPassword, // Salva a senha criptografada
        role: dto.role,        // Garanta que o DTO tenha 'role'
      },
    });
  }

  // 2. Buscar por Email (Usado no Login)
  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  // 3. Buscar por ID (Usado no Controller e no JWT)
  async findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }
}
