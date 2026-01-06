import { Test, TestingModule } from '@nestjs/testing';
import { MigrantesController } from './migrantes.controller';
import { MigrantesService } from './migrantes.service';

describe('MigrantesController', () => {
  let controller: MigrantesController;

  const mockMigrantesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MigrantesController],
      providers: [
        {
          provide: MigrantesService,
          useValue: mockMigrantesService, // <--- Injetamos o Service Mock
        },
      ],
    }).compile();

    controller = module.get<MigrantesController>(MigrantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
