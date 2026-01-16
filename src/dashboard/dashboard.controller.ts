import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt')) // Protegido
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('resumo') // GET /dashboard/resumo
  async getResumo() {
    return this.dashboardService.getResumoGeral();
  }

  @Get('nacionalidades') // GET /dashboard/nacionalidades
  async getNacionalidades() {
    return this.dashboardService.getNacionalidades();
  }

  @Get('atendimentos-recentes') // GET /dashboard/atendimentos-recentes
  async getAtendimentos() {
    return this.dashboardService.getAtendimentosRecentes();
  }
}
