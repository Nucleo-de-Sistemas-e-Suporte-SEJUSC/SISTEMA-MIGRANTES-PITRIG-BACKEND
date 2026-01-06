import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMigranteDto {
  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @IsDateString()
  @IsNotEmpty()
  dataNascimento: Date;

  @IsString()
  @IsNotEmpty()
  sexo: string;

  @IsString()
  @IsNotEmpty()
  nacionalidade: string;

  @IsString()
  @IsNotEmpty()
  paisOrigem: string;

  @IsString()
  @IsNotEmpty()
  statusLegal: string;

  @IsString()
  @IsNotEmpty()
  etnia: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsBoolean()
  @IsOptional()
  temDeficiencia?: boolean;

  @IsDateString()
  @IsNotEmpty()
  dataEntradaBrasil: Date;

  @IsString()
  @IsNotEmpty()
  pontoEntradaBrasil: string;

  @IsString()
  @IsOptional()
  bairro?: string;

  @IsString()
  @IsOptional()
  contato?: string;

  @IsOptional()
  grupoFamiliarId?: number;
}
