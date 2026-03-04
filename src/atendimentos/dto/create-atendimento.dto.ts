import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAtendimentoDto {
  @IsDateString()
  @IsNotEmpty()
  dataAtendimento: Date;

  @IsString()
  @IsNotEmpty()
  localAtendimento: string;

  @IsString()
  @IsNotEmpty()
  tipoAssistencia: string;

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
  @IsOptional()
  encaminhamentos?: string;

  @IsString()
  @IsOptional()
  observacoesEncaminhamentos?: string;

  @IsString()
  @IsNotEmpty()
  assistenciaEntreguePor: string;

  @IsString()
  @IsOptional()
  atualizadoPor?: string;

  @IsInt()
  @IsNotEmpty()
  migranteId: number;

  @IsInt()
  @IsNotEmpty()
  atendenteId: number;
}