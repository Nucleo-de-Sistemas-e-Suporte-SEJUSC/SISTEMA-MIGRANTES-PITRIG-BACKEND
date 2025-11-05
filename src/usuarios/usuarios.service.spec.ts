import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto'; // RE-ADICIONADO
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Prisma } from '@prisma/client'; // RE-ADICIONADO

const mockPrismaService = {
  usuario: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('UsuariosService', () => {
  let service: UsuariosService;
  let prisma: typeof mockPrismaService;

  // Mock do erro P2025 (Registro não encontrado) do Prisma
  const prismaErrorP2025 = new Prisma.PrismaClientKnownRequestError(
    'Registro não encontrado',
    {
      code: 'P2025',
      clientVersion: 'x.x.x', // A versão não importa para o teste
    },
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- Teste do método 'criarUsuario' ---
  describe('criarUsuario', () => {
    it('deve criar um novo usuário e hashear a senha corretamente', async () => {
      const dto: CreateUsuarioDto = {
        nome: 'Usuario Teste',
        email: 'teste@email.com',
        senha: 'senha123',
      };
      const senhaHasheada = 'senha-hasheada-mock-123';
      const usuarioSalvoMock = {
        id: 1,
        nome: 'Usuario Teste',
        email: 'teste@email.com',
        senha: senhaHasheada,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      (bcrypt.hash as jest.Mock).mockResolvedValue(senhaHasheada);
      prisma.usuario.findUnique.mockResolvedValue(null);
      prisma.usuario.create.mockResolvedValue(usuarioSalvoMock);
      const resultado = await service.criarUsuario(dto);
      expect(resultado).toEqual(usuarioSalvoMock);
      expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
      expect(prisma.usuario.findUnique).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.senha, 10);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(prisma.usuario.create).toHaveBeenCalledWith({
        data: {
          nome: dto.nome,
          email: dto.email,
          senha: senhaHasheada,
        },
      });
      expect(prisma.usuario.create).toHaveBeenCalledTimes(1);
    });

    it('deve lançar um ConflictException se o e-mail já existir', async () => {
      const dto: CreateUsuarioDto = {
        nome: 'Usuario Teste',
        email: 'teste@email.com',
        senha: 'senha123',
      };
      const usuarioExistenteMock = {
        id: 99,
        nome: 'Usuario Antigo',
        email: 'teste@email.com',
        senha: 'senha-antiga-hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prisma.usuario.findUnique.mockResolvedValue(usuarioExistenteMock);
      await expect(service.criarUsuario(dto)).rejects.toThrow(ConflictException);
      expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
      expect(prisma.usuario.findUnique).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(prisma.usuario.create).not.toHaveBeenCalled();
    });
  });

  // --- Teste do método 'listarUsuarios' ---
  describe('listarUsuarios', () => {
    it('deve retornar um array de usuários', async () => {
      const mockListaUsuarios = [
        {
          id: 1,
          nome: 'Usuario Teste 1',
          email: 'teste1@email.com',
          senha: 'hash1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      prisma.usuario.findMany.mockResolvedValue(mockListaUsuarios);
      const resultado = await service.listarUsuarios();
      expect(resultado).toEqual(mockListaUsuarios);
      expect(prisma.usuario.findMany).toHaveBeenCalledTimes(1);
    });
  });

  // --- Teste do método 'buscarUsuario' ---
  describe('buscarUsuario', () => {
    it('deve retornar um único usuário se o ID for encontrado', async () => {
      const idParaBuscar = 1;
      const mockUsuario = {
        id: idParaBuscar,
        nome: 'Usuario Teste 1',
        email: 'teste1@email.com',
        senha: 'hash1',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      prisma.usuario.findUnique.mockResolvedValue(mockUsuario);
      const resultado = await service.buscarUsuario(idParaBuscar);
      expect(resultado).toEqual(mockUsuario);
      expect(prisma.usuario.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
        where: { id: idParaBuscar },
      });
    });

    it('deve lançar um NotFoundException se o ID não for encontrado', async () => {
      const idParaBuscar = 999;
      prisma.usuario.findUnique.mockResolvedValue(null);
      await expect(service.buscarUsuario(idParaBuscar)).rejects.toThrow(
        NotFoundException,
      );
      expect(prisma.usuario.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
        where: { id: idParaBuscar },
      });
    });
  });

  // --- INÍCIO DOS NOVOS TESTES ---

  // --- Teste do método 'atualizarUsuario' ---
  describe('atualizarUsuario', () => {
    it('deve atualizar um usuário (sem senha) com sucesso', async () => {
      const idParaAtualizar = 1;
      const dto: UpdateUsuarioDto = { nome: 'Novo Nome' };
      const mockUsuarioAtualizado = {
        id: idParaAtualizar,
        nome: 'Novo Nome',
        email: 'original@email.com',
        senha: 'hash-antigo',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.usuario.update.mockResolvedValue(mockUsuarioAtualizado);
      const resultado = await service.atualizarUsuario(idParaAtualizar, dto);

      expect(resultado).toEqual(mockUsuarioAtualizado);
      expect(prisma.usuario.update).toHaveBeenCalledTimes(1);
      expect(prisma.usuario.update).toHaveBeenCalledWith({
        where: { id: idParaAtualizar },
        data: { nome: 'Novo Nome' },
      });
      expect(bcrypt.hash).not.toHaveBeenCalled(); // Senha não foi atualizada
    });

    it('deve atualizar um usuário (com senha) e hashear a nova senha', async () => {
      const idParaAtualizar = 1;
      const dto: UpdateUsuarioDto = { senha: 'novaSenha123' };
      const senhaHasheada = 'nova-senha-hasheada-456';
      const mockUsuarioAtualizado = {
        id: idParaAtualizar,
        nome: 'Nome Original',
        email: 'original@email.com',
        senha: senhaHasheada,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (bcrypt.hash as jest.Mock).mockResolvedValue(senhaHasheada);
      prisma.usuario.update.mockResolvedValue(mockUsuarioAtualizado);
      const resultado = await service.atualizarUsuario(idParaAtualizar, dto);

      expect(resultado).toEqual(mockUsuarioAtualizado);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledWith('novaSenha123', 10);
      expect(prisma.usuario.update).toHaveBeenCalledTimes(1);
      expect(prisma.usuario.update).toHaveBeenCalledWith({
        where: { id: idParaAtualizar },
        data: { senha: senhaHasheada }, // Deve enviar a senha hasheada
      });
    });

    it('deve lançar um NotFoundException se o usuário a ser atualizado não for encontrado', async () => {
      const idParaAtualizar = 999;
      const dto: UpdateUsuarioDto = { nome: 'Nome Fantasma' };

      // Simula o erro P2025 do Prisma (registro não encontrado)
      prisma.usuario.update.mockRejectedValue(prismaErrorP2025);

      await expect(
        service.atualizarUsuario(idParaAtualizar, dto),
      ).rejects.toThrow(NotFoundException);

      expect(prisma.usuario.update).toHaveBeenCalledTimes(1);
      expect(prisma.usuario.update).toHaveBeenCalledWith({
        where: { id: idParaAtualizar },
        data: dto,
      });
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });
  });

  // --- Teste do método 'deletarUsuario' ---
  describe('deletarUsuario', () => {
    it('deve deletar um usuário com sucesso', async () => {
      const idParaDeletar = 1;
      const mockUsuarioDeletado = {
        id: idParaDeletar,
        nome: 'Usuario Deletado',
        email: 'deletado@email.com',
        senha: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.usuario.delete.mockResolvedValue(mockUsuarioDeletado);
      const resultado = await service.deletarUsuario(idParaDeletar);

      expect(resultado).toEqual(mockUsuarioDeletado);
      expect(prisma.usuario.delete).toHaveBeenCalledTimes(1);
      expect(prisma.usuario.delete).toHaveBeenCalledWith({
        where: { id: idParaDeletar },
      });
    });

    it('deve lançar um NotFoundException se o usuário a ser deletado não for encontrado', async () => {
      const idParaDeletar = 999;

      // Simula o erro P2025 do Prisma (registro não encontrado)
      prisma.usuario.delete.mockRejectedValue(prismaErrorP2025);

      await expect(service.deletarUsuario(idParaDeletar)).rejects.toThrow(
        NotFoundException,
      );

      expect(prisma.usuario.delete).toHaveBeenCalledTimes(1);
      expect(prisma.usuario.delete).toHaveBeenCalledWith({
        where: { id: idParaDeletar },
      });
    });
  });

  // --- FIM DOS NOVOS TESTES ---
});