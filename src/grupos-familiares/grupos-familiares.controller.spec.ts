import { Test, TestingModule } from '@nestjs/testing';
import { GruposFamiliaresController } from './grupos-familiares.controller';

describe('GruposFamiliaresController', () => {
  let controller: GruposFamiliaresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GruposFamiliaresController],
    }).compile();

    controller = module.get<GruposFamiliaresController>(
      GruposFamiliaresController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
