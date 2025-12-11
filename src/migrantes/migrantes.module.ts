import { Module } from '@nestjs/common';
import { MigrantesController } from './migrantes.controller';
import { MigrantesService } from './migrantes.service';

@Module({
  controllers: [MigrantesController],
  providers: [MigrantesService]
})
export class MigrantesModule {}
