import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  /** 1️⃣ Criar Usuário (com senha criptografada) */
  async create(dto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(dto.senha, 10);
    return this.prisma.usuario.create({
      data: {
        nome: dto.nome,
        email: dto.email,
        senha: hashedPassword,
        role: dto.role,
      },
    });
  }

  /** 2️⃣ Listar todos (sem senha) */
  async findAll() {
    return this.prisma.usuario.findMany({
      orderBy: { id: 'asc' },
      select: { id: true, nome: true, email: true, role: true, criadoEm: true },
    });
  }

  /** 3️⃣ Buscar por email (login) */
  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  /** 4️⃣ Buscar por ID (sem senha) */
  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: { id: true, nome: true, email: true, role: true, criadoEm: true },
    });
    if (!usuario) throw new NotFoundException(`Usuário #${id} não encontrado`);
    return usuario;
  }

  /** 5️⃣ Atualizar usuário (parcial) */
  async update(id: number, dto: UpdateUsuarioDto) {
    await this.findOne(id); // garante que existe

    const data: any = {};
    if (dto.nome)  data.nome  = dto.nome;
    if (dto.email) data.email = dto.email;
    if (dto.role)  data.role  = dto.role;
    if (dto.senha) data.senha = await bcrypt.hash(dto.senha, 10);

    return this.prisma.usuario.update({
      where: { id },
      data,
      select: { id: true, nome: true, email: true, role: true, criadoEm: true },
    });
  }

  /** 6️⃣ Excluir usuário */
  async remove(id: number) {
    await this.findOne(id); // garante que existe
    return this.prisma.usuario.delete({ where: { id } });
  }
}
