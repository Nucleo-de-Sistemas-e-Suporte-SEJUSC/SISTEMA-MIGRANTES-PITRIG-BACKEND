import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';

@Injectable()
export class AtendimentosService {
  constructor(private prisma: PrismaService) {}

  // 1. Criar Registro
  create(dto: CreateAtendimentoDto) {
    return this.prisma.atendimento.create({
      data: {
        dataAtendimento:           dto.dataAtendimento,
        localAtendimento:          dto.localAtendimento,
        tipoAssistencia:           dto.tipoAssistencia,
        consentimento:             dto.consentimento,
        prioridades:               dto.prioridades,
        observacao:                dto.observacao,
        encaminhamentos:           dto.encaminhamentos,
        observacoesEncaminhamentos: dto.observacoesEncaminhamentos,
        assistenciaEntreguePor:    dto.assistenciaEntreguePor,
        atualizadoPor:             dto.atualizadoPor,
        migranteId:                dto.migranteId,
        atendenteId:               dto.atendenteId,
      },
    });
  }

  // 2. Buscar por ID
  async findOne(id: number) {
    const atendimento = await this.prisma.atendimento.findUnique({ where: { id } });
    if (!atendimento) throw new NotFoundException(`Atendimento #${id} não encontrado.`);
    return atendimento;
  }

  // 3. Atualizar parcialmente (somente campos do Atendimento)
  async update(id: number, dto: Partial<CreateAtendimentoDto>) {
    await this.findOne(id);
    return this.prisma.atendimento.update({
      where: { id },
      data: {
        ...(dto.dataAtendimento            !== undefined && { dataAtendimento:           dto.dataAtendimento            }),
        ...(dto.localAtendimento           !== undefined && { localAtendimento:          dto.localAtendimento           }),
        ...(dto.tipoAssistencia            !== undefined && { tipoAssistencia:           dto.tipoAssistencia            }),
        ...(dto.consentimento              !== undefined && { consentimento:             dto.consentimento              }),
        ...(dto.prioridades                !== undefined && { prioridades:               dto.prioridades                }),
        ...(dto.observacao                 !== undefined && { observacao:                dto.observacao                 }),
        ...(dto.encaminhamentos            !== undefined && { encaminhamentos:           dto.encaminhamentos            }),
        ...(dto.observacoesEncaminhamentos !== undefined && { observacoesEncaminhamentos: dto.observacoesEncaminhamentos }),
        ...(dto.assistenciaEntreguePor     !== undefined && { assistenciaEntreguePor:    dto.assistenciaEntreguePor     }),
        ...(dto.atualizadoPor              !== undefined && { atualizadoPor:             dto.atualizadoPor              }),
      },
    });
  }

  // 4. Listar Todos
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
      orderBy: { dataAtendimento: 'desc' },
    });
  }
}