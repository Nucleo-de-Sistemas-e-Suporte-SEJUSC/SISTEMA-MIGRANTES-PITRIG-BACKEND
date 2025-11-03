import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  /**
   * O nome do usuário.
   * @example "João da Silva"
   */
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  nome: string;

  /**
   * O e-mail único do usuário.
   * @example "joao.silva@email.com"
   */
  @IsEmail({}, { message: 'O e-mail fornecido não é válido' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  email: string;

  /**
   * A senha do usuário.
   * Deve ter no mínimo 6 caracteres.
   * @example "senha123"
   */
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  senha: string;
}
