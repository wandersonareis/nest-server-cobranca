import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class IdParam {
  @Type(() => Number)
  @IsInt({
    message: 'id: deve ser um número',
  })
  id: number;
}
