import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class SkipTakeQuery {
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: 'skip: deve ser um némero',
  })
  @Min(0, {
    message: 'skip: deve ser um número maior ou igual a 0',
  })
  skip: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: 'skip: deve ser um némero',
  })
  @Min(1, {
    message: 'take: deve ser um némero maior ou igual a 1',
  })
  @Max(100, {
    message: 'take: deve ser um número menor ou igual a 100',
  })
  take: number;
}
