import { Test, TestingModule } from '@nestjs/testing';
import { MigrantesController } from './migrantes.controller';

describe('MigrantesController', () => {
  let controller: MigrantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MigrantesController],
    }).compile();

    controller = module.get<MigrantesController>(MigrantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
