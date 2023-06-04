import { PartialType } from '@nestjs/mapped-types';
import { CreateReceivableDto } from './create-receivable.dto';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateReceivableDto extends PartialType(CreateReceivableDto) {
  @IsOptional()
  @IsDateString({ strict: true }, { message: 'Data inválida' })
  updated_at: Date;
}
