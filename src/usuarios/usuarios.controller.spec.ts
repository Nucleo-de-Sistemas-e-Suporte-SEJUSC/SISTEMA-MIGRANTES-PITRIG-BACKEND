import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service'; // 1. IMPORTAR O SERVIÇO

describe('UsuariosController', () => {
  let controller: UsuariosController;
  const mockUsuariosService = {
    criarUsuario: jest.fn(),
    listarUsuarios: jest.fn(),
    buscarUsuario: jest.fn(),
    atualizarUsuario: jest.fn(),
    deletarUsuario: jest.fn(),
    // Adicione qualquer outro método que seu serviço tenha
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      // 3. FORNECER O MOCK
      // Isso diz ao Nest: "Quando o UsuariosController pedir o
      // UsuariosService, entregue este 'mockUsuariosService' no lugar."
      providers: [
        {
          provide: UsuariosService,
          useValue: mockUsuariosService,
        },
      ],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    // Opcional: pegar a instância do mock
    // service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});