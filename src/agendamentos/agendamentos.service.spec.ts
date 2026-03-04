import { Test, TestingModule } from '@nestjs/testing';
import { AgendamentosService } from './agendamentos.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AgendamentosService', () => {
  let service: AgendamentosService;

  const mockPrismaService = {
    agendamento: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgendamentosService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AgendamentosService>(AgendamentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
