import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usuariosService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SEU_SEGREDO_SUPER_SECRETO_AQUI', // !! USE O MESMO SEGREDO DO auth.module !!
    });
  }

  // Este método é chamado pelo NestJS após validar o token
  async validate(payload: any) {
    // 'payload.sub' deve ser o ID do usuário que você colocou no token
    const usuario = await this.usuariosService.buscarUsuario(payload.sub); 

    if (!usuario) {
      throw new UnauthorizedException('Token inválido ou usuário não existe.');
    }

    // O objeto 'usuario' retornado aqui será injetado no @Req()
    // das suas rotas protegidas.
    return usuario;
  }
}
