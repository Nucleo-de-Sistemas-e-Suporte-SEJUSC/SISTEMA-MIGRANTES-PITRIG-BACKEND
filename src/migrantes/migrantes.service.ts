import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMigranteDto } from './dto/create-migrante.dto';

@Injectable()
export class MigrantesService {
  constructor(private prisma: PrismaService) {}

  // 1. Criar Migrante
  create(dto: CreateMigranteDto) {
    return this.prisma.migrante.create({
      data: {
        nomeCompleto: dto.nomeCompleto,
        dataNascimento: dto.dataNascimento,
        sexo: dto.sexo,
        nacionalidade: dto.nacionalidade,
        paisOrigem: dto.paisOrigem,
        statusLegal: dto.statusLegal,
        etnia: dto.etnia,
        cpf: dto.cpf,
        temDeficiencia: dto.temDeficiencia ?? false, // Padrão é false se não vier
        dataEntradaBrasil: dto.dataEntradaBrasil,
        pontoEntradaBrasil: dto.pontoEntradaBrasil,
        bairro: dto.bairro,
        contato: dto.contato,
        grupoFamiliarId: dto.grupoFamiliarId,
      },
    });
  }

  // 2. Listar Todos
  findAll() {
    return this.prisma.migrante.findMany({
      orderBy: { id: 'desc' },
    });
  }

  // 3. Buscar Um por ID
  async findOne(id: number) {
    const migrante = await this.prisma.migrante.findUnique({
      where: { id },
    });
    if (!migrante) throw new NotFoundException('Migrante não encontrado.');
    return migrante;
  }

  // 4. Deletar
  async remove(id: number) {
    await this.findOne(id); // Garante que existe antes de tentar deletar
    return this.prisma.migrante.delete({
      where: { id },
    });
  }
}
