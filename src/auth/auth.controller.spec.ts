import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            // Criamos uma função 'login' falsa
            login: jest.fn().mockResolvedValue({ access_token: 'fake-token' }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  // Este teste vai passar
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
