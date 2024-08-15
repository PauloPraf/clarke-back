import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateFornecedorDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  logo: string;

  @IsString()
  @IsNotEmpty()
  estadoOrigem: string;

  @IsNumber()
  @Min(0)
  custoPorKwh: number;

  @IsNumber()
  @Min(0)
  limiteMinimoKwh: number;

  @IsNumber()
  @Min(0)
  totalClientes: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  avaliacaoMedia: number;
}
