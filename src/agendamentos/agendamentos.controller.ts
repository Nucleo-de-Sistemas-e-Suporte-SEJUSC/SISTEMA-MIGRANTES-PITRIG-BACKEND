import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AgendamentosService } from './agendamentos.service';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { AuthGuard } from '@nestjs/passport'; // 1. IMPORTE O AUTHGUARD

@UseGuards(AuthGuard('jwt')) // 2. PROTEJA TODAS AS ROTAS DESTE CONTROLLER!
@Controller('agendamentos') // Rota base: /agendamentos
export class AgendamentosController {
  constructor(private readonly agendamentosService: AgendamentosService) {}

  // Rota: POST /agendamentos
  @Post()
  create(@Body() createAgendamentoDto: CreateAgendamentoDto) {
    return this.agendamentosService.create(createAgendamentoDto);
  }

  // Rota: GET /agendamentos
  @Get()
  findAll() {
    return this.agendamentosService.findAll();
  }
}
