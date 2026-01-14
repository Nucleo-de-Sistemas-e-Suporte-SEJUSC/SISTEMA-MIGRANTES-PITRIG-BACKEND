import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAtendimentoDto {
  @IsDateString()
  @IsNotEmpty()
  dataAtendimento: Date; // Formato ISO: "2025-10-20T14:00:00.000Z"

  @IsString()
  @IsNotEmpty()
  localAtendimento: string;

  @IsString()
  @IsNotEmpty()
  tipoAssistencia: string; // Ex: "Alimentação", "Jurídico"

  @IsBoolean()
  @IsNotEmpty()
  consentimento: boolean;

  @IsString()
  @IsOptional()
  prioridades?: string;

  @IsString()
  @IsOptional()
  observacao?: string;

  @IsString()
  @IsNotEmpty()
  assistenciaEntreguePor: string; // Nome de quem entregou

  @IsInt()
  @IsNotEmpty()
  migranteId: number; // Quem recebeu (ID do Migrante)

  @IsInt()
  @IsNotEmpty()
  atendenteId: number; // Quem registrou (ID do Usuário)
}