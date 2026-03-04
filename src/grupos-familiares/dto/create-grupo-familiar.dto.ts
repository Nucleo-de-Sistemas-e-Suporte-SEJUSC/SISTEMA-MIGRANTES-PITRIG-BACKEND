import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGrupoFamiliarDto {
  @IsString()
  @IsNotEmpty()
  numeroGrupo: string;

  @IsInt()
  @IsOptional()
  pontoFocalId?: number;
}
