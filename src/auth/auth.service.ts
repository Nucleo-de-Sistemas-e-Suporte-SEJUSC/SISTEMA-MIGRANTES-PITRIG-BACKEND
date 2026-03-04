import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  // 1. Validação do usuário
  async validateUser(email: string, pass: string): Promise<any> {
    const usuario = await this.usuariosService.findByEmail(email);
    
    if (usuario && (await bcrypt.compare(pass, usuario.senha))) {
      const { senha, ...result } = usuario;
      return result;
    }
    return null;
  }

  // 2. Login corrigido - agora recebe LoginDto e valida credenciais
  async login(loginDto: LoginDto) {
    // ✅ VALIDA AS CREDENCIAIS PRIMEIRO
    const usuario = await this.validateUser(loginDto.email, loginDto.senha);
    
    if (!usuario) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // ✅ GERA O TOKEN COM OS DADOS DO USUÁRIO VALIDADO
    const payload = { sub: usuario.id, email: usuario.email };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: usuario, // ✅ Retorna também os dados do usuário para o frontend
    };
  }
}