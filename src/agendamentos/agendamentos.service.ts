import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';

@Injectable()
export class AgendamentosService {
  // 1. Injeta o PrismaService
  constructor(private prisma: PrismaService) {}

  // 2. Método para criar
  create(dto: CreateAgendamentoDto) {
    return this.prisma.agendamento.create({
      data: {
        dataAgendamento: dto.dataAgendamento,
        nome: dto.nome,
        contato: dto.contato,
        infoGrupoFamiliar: dto.infoGrupoFamiliar,
        // status e criadoEm serão definidos pelo @default no schema
      },
    });
  }

  // 3. Método para listar todos
  findAll() {
    return this.prisma.agendamento.findMany();
  }
}
