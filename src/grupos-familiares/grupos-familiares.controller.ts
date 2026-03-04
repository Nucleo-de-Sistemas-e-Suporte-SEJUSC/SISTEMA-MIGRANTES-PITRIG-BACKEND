import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { GruposFamiliaresService } from './grupos-familiares.service';
import { CreateGrupoFamiliarDto } from './dto/create-grupo-familiar.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt')) // 🔒 Protegido
@Controller('grupos-familiares')
export class GruposFamiliaresController {
  constructor(private readonly gruposFamiliaresService: GruposFamiliaresService) {}

  @Post()
  create(@Body() createGrupoFamiliarDto: CreateGrupoFamiliarDto) {
    return this.gruposFamiliaresService.create(createGrupoFamiliarDto);
  }

  @Get()
  findAll() {
    return this.gruposFamiliaresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gruposFamiliaresService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gruposFamiliaresService.remove(id);
  }
}
