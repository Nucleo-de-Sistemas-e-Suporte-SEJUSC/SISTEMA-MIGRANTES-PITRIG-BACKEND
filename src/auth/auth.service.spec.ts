import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsuariosService } from '../usuarios/usuarios.service'; // 1. IMPORTAR
import { JwtService } from '@nestjs/jwt'; // 2. IMPORTAR

describe('AuthService', () => {
  let service: AuthService;

  // 3. MOCK PARA USUARIOSSERVICE
  const mockUsuariosService = {
    findByEmail: jest.fn(),
    // Adicione outros métodos que o AuthService possa usar
  };

  // 4. MOCK PARA JWTSERVICE
  const mockJwtService = {
    sign: jest.fn(),
    // Adicione outros métodos que o AuthService possa usar
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // 5. PROVIDERS CORRIGIDOS
      providers: [
        AuthService, // O serviço real que queremos testar
        {
          provide: UsuariosService, // Quando o AuthService pedir o UsuariosService...
          useValue: mockUsuariosService, // ...entregue este mock.
        },
        {
          provide: JwtService, // Quando o AuthService pedir o JwtService...
          useValue: mockJwtService, // ...entregue este mock.
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
