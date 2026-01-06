import { Module } from '@nestjs/common';
import { GruposFamiliaresController } from './grupos-familiares.controller';
import { GruposFamiliaresService } from './grupos-familiares.service';

@Module({
  controllers: [GruposFamiliaresController],
  providers: [GruposFamiliaresService]
})
export class GruposFamiliaresModule {}
