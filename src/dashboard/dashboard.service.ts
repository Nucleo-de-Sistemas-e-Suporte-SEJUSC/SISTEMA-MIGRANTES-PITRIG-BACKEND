import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getResumo() {
    const hoje = new Date();
    const inicioHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const fimHoje    = new Date(inicioHoje.getTime() + 86400000);

    const inicioSemana = new Date(inicioHoje);
    inicioSemana.setDate(inicioSemana.getDate() - 7);

    const [
      totalMigrantes,
      agendamentosHoje,
      atendimentosConcluidos,
      atendimentosAtivos,
      totalNacionalidades,
    ] = await Promise.all([
      this.prisma.migrante.count(),
      this.prisma.agendamento.count({
        where: { dataAgendamento: { gte: inicioHoje, lt: fimHoje } },
      }),
      this.prisma.atendimento.count({
        where: { dataAtendimento: { gte: inicioSemana, lt: fimHoje } },
      }),
      this.prisma.atendimento.count({
        where: { dataAtendimento: { gte: inicioHoje, lt: fimHoje } },
      }),
      this.prisma.migrante.groupBy({
        by: ['nacionalidade'],
      }).then(r => r.length),
    ]);

    const documentados = await this.prisma.migrante.count({
      where: { statusLegal: 'Documentado' },
    });

    const taxaComparecimento = totalMigrantes > 0
      ? Math.round((documentados / totalMigrantes) * 100)
      : 0;

    return {
      totalMigrantes,
      agendamentosHoje,
      atendimentosConcluidos,
      atendimentosAtivos,
      totalNacionalidades,
      taxaComparecimento,
    };
  }
}