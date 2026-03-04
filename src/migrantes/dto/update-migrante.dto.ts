import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateMigranteDto {
  @IsString()
  @IsOptional()
  nomeCompleto?: string;

  @IsDateString()
  @IsOptional()
  dataNascimento?: Date;

  @IsString()
  @IsOptional()
  sexo?: string;

  @IsString()
  @IsOptional()
  nacionalidade?: string;

  @IsString()
  @IsOptional()
  paisOrigem?: string;

  @IsString()
  @IsOptional()
  statusLegal?: string;

  @IsString()
  @IsOptional()
  etnia?: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsBoolean()
  @IsOptional()
  temDeficiencia?: boolean;

  @IsDateString()
  @IsOptional()
  dataEntradaBrasil?: Date;

  @IsString()
  @IsOptional()
  pontoEntradaBrasil?: string;

  @IsString()
  @IsOptional()
  bairro?: string;

  @IsString()
  @IsOptional()
  contato?: string;

  @IsString()
  @IsOptional()
  municipioResidencia?: string;

  @IsString()
  @IsOptional()
  profissao?: string;

  @IsString()
  @IsOptional()
  composicaoFamiliar?: string;

  @IsBoolean()
  @IsOptional()
  isChefeFamilia?: boolean;

  @IsString()
  @IsOptional()
  escolaridade?: string;

  @IsString()
  @IsOptional()
  crnm?: string;

  @IsDateString()
  @IsOptional()
  validadeCrnm?: Date;

  @IsOptional()
  grupoFamiliarId?: number;
}