import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  // 1. Cards Principais (Totais Gerais)
  async getResumoGeral() {
    const totalMigrantes = await this.prisma.migrante.count();
    const totalAtendimentos = await this.prisma.atendimento.count();
    
    // Conta agendamentos para o futuro
    const agendamentosPendentes = await this.prisma.agendamento.count({
      where: { dataAgendamento: { gte: new Date() } } // gte = maior ou igual a hoje
    });

    return {
      totalMigrantes,
      totalAtendimentos,
      agendamentosPendentes,
    };
  }

  // 2. Gráfico de Nacionalidades (Top 5)
  async getNacionalidades() {
    // Agrupa por nacionalidade e conta
    const dados = await this.prisma.migrante.groupBy({
      by: ['nacionalidade'],
      _count: {
        nacionalidade: true,
      },
      orderBy: {
        _count: {
          nacionalidade: 'desc',
        },
      },
      take: 5, // Pega só os top 5
    });

    // Formata para ficar bonito no JSON
    return dados.map((item) => ({
      pais: item.nacionalidade,
      quantidade: item._count.nacionalidade,
    }));
  }

  // 3. Atendimentos por Mês (Para gráficos de linha)
  // Nota: Fazer isso com Prisma puro é complexo, então vamos simplificar pegando os últimos 30 dias
  async getAtendimentosRecentes() {
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() - 30); // 30 dias atrás

    const atendimentos = await this.prisma.atendimento.findMany({
      where: {
        dataAtendimento: { gte: dataLimite },
      },
      select: {
        dataAtendimento: true,
      },
    });

    // Aqui o Front-end pode agrupar as datas, mas já devolvemos a lista bruta recente
    return { totalUltimos30Dias: atendimentos.length, lista: atendimentos };
  }
}
