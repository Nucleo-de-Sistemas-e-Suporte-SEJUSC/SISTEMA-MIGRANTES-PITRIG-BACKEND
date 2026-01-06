import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { MigrantesService } from './migrantes.service';
import { CreateMigranteDto } from './dto/create-migrante.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt')) //  Protege TUDO com Token
@Controller('migrantes')
export class MigrantesController {
  constructor(private readonly migrantesService: MigrantesService) {}

  @Post()
  create(@Body() createMigranteDto: CreateMigranteDto) {
    return this.migrantesService.create(createMigranteDto);
  }

  @Get()
  findAll() {
    return this.migrantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.migrantesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.migrantesService.remove(id);
  }
}