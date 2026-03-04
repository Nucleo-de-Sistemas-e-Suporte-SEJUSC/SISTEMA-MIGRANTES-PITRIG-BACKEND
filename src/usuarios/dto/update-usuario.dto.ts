import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto'; // <-- Importa o DTO que você acabou de criar

/**
 * PartialType(CreateUsuarioDto) pega todas as regras de validação
 * do CreateUsuarioDto (IsEmail, MinLength, etc.)
 * e as torna opcionais.
 */
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}