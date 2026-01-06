import { Test, TestingModule } from '@nestjs/testing';
import { MigrantesService } from './migrantes.service';
import { PrismaService } from '../prisma/prisma.service'; // Ajuste o caminho se necessário (pode ser 'src/prisma...')

describe('MigrantesService', () => {
  let service: MigrantesService;

  const mockPrismaService = {
    migrante: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MigrantesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // <--- Aqui injetamos o Mock
        },
      ],
    }).compile();

    service = module.get<MigrantesService>(MigrantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
