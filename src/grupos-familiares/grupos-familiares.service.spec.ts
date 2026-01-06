import { Test, TestingModule } from '@nestjs/testing';
import { GruposFamiliaresService } from './grupos-familiares.service';

describe('GruposFamiliaresService', () => {
  let service: GruposFamiliaresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GruposFamiliaresService],
    }).compile();

    service = module.get<GruposFamiliaresService>(GruposFamiliaresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
