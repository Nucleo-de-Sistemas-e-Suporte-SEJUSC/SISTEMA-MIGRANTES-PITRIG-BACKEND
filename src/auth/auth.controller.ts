import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth') // Define a rota base como /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // Define a rota como POST /auth/login
  login(@Body() loginDto: any) {
    // Nós corrigimos isso antes:
    // Passamos o DTO inteiro para o service.
    return this.authService.login(loginDto);
  }
}
