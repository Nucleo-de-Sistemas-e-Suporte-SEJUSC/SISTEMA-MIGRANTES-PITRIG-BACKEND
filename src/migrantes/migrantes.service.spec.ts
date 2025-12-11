import { Test, TestingModule } from '@nestjs/testing';
import { MigrantesService } from './migrantes.service';

describe('MigrantesService', () => {
  let service: MigrantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MigrantesService],
    }).compile();

    service = module.get<MigrantesService>(MigrantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
