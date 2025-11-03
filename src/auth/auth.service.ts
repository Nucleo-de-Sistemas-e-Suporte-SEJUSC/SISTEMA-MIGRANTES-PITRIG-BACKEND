import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service'; // Você precisará importar seu serviço de usuário
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService, // O Nest vai injetar isso
  ) {}

  // 1. Validação do usuário
  async validateUser(email: string, pass: string): Promise<any> {
    const usuario = await this.usuariosService.findByEmail(email); // Você precisa criar esse método no usuarios.service!
    
    if (usuario && (await bcrypt.compare(pass, usuario.senha))) {
      // bcrypt.compare é o jeito seguro de comparar a senha pura (pass) 
      // com a senha hasheada (usuario.senha)
      const { senha, ...result } = usuario; // Remove a senha do objeto
      return result; // Retorna o usuário (sem a senha)
    }
    return null; // Retorna nulo se o usuário não for encontrado ou a senha estiver errada
  }

  // 2. Geração do Token
  async login(usuario: any) {
    const payload = { sub: usuario.id, email: usuario.email }; // O que vai dentro do Token
    return {
      access_token: this.jwtService.sign(payload), // Gera o Token!
    };
  }
}