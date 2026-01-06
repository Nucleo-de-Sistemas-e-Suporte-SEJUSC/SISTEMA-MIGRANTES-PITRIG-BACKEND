import { Test, TestingModule } from '@nestjs/testing';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';

describe('AgendamentosController', () => {
  let controller: AgendamentosController;

  const mockAgendamentosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgendamentosController],
      providers: [
        {
          provide: AgendamentosService,
          useValue: mockAgendamentosService,
        },
      ],
    }).compile();

    controller = module.get<AgendamentosController>(AgendamentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
