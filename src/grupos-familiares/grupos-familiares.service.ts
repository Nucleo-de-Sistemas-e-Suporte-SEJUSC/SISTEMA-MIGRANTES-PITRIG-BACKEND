import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGrupoFamiliarDto } from './dto/create-grupo-familiar.dto';

@Injectable()
export class GruposFamiliaresService {
  constructor(private prisma: PrismaService) {}

  // 1. Criar Grupo
  create(dto: CreateGrupoFamiliarDto) {
    return this.prisma.grupoFamiliar.create({
      data: {
        numeroGrupo: dto.numeroGrupo,
        pontoFocalId: dto.pontoFocalId,
      },
    });
  }

  // 2. Listar Todos (Trazendo os membros juntos!)
  findAll() {
    return this.prisma.grupoFamiliar.findMany({
      include: {
        membros: true, // <--- Isso mostra quem está na família
      },
    });
  }

  // 3. Buscar um por ID
  async findOne(id: number) {
    const grupo = await this.prisma.grupoFamiliar.findUnique({
      where: { id },
      include: {
        membros: true,
      },
    });

    if (!grupo) throw new NotFoundException('Grupo Familiar não encontrado.');
    return grupo;
  }

  // 4. Deletar
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.grupoFamiliar.delete({
      where: { id },
    });
  }
}
