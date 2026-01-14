import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';

@Injectable()
export class AtendimentosService {
  constructor(private prisma: PrismaService) {}

  // 1. Criar Registro
  create(dto: CreateAtendimentoDto) {
    return this.prisma.atendimento.create({
      data: {
        dataAtendimento: dto.dataAtendimento,
        localAtendimento: dto.localAtendimento,
        tipoAssistencia: dto.tipoAssistencia,
        consentimento: dto.consentimento,
        prioridades: dto.prioridades,
        observacao: dto.observacao,
        assistenciaEntreguePor: dto.assistenciaEntreguePor,
        migranteId: dto.migranteId,
        atendenteId: dto.atendenteId,
      },
    });
  }

  // 2. Listar Todos (Com nomes!)
  findAll() {
    return this.prisma.atendimento.findMany({
      include: {
        migrante: {
          select: { nomeCompleto: true, nacionalidade: true },
        },
        atendente: {
          select: { nome: true },
        },
      },
      orderBy: { dataAtendimento: 'desc' }, // Mais recentes primeiro
    });
  }
}