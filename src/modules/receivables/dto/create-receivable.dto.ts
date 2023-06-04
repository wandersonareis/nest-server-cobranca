import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateReceivableDto {
  @IsNotEmpty({
    message: 'value: não pode ser vazio',
  })
  @IsInt({
    message: 'value: deve ser um número inteiro e em centavos',
  })
  readonly value: number;

  @IsNotEmpty({
    message: 'paymentDate: não pode ser vazio',
  })
  @IsDateString(
    { strict: true },
    {
      message: 'paymentDate: deve ser uma data válida',
    },
  )
  readonly paymentDate: Date;

  @IsOptional()
  @IsString({
    message: 'description: deve ser uma string',
  })
  readonly description: string;

  @IsOptional()
  @IsInt({
    message: 'status: deve ser um némero inteiro',
  })
  @Min(1, { message: 'status: deve ser um número inteiro maior que zero' })
  readonly status: number;
}
