import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAgendamentoDto {
  @IsDateString()
  @IsNotEmpty()
  dataAgendamento: Date;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional() //
  contato?: string;

  @IsString()
  @IsOptional()
  infoGrupoFamiliar?: string;
}
