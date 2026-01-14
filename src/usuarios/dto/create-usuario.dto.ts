import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

enum Role {
  ATENDENTE = 'ATENDENTE',
  GESTOR = 'GESTOR',
  ADMIN = 'ADMIN',
}

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  senha: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role; // Ex: "ADMIN"
}
