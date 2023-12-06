import { Type } from 'class-transformer';
import {
  IsNumber,
  IsObject,
  IsOptional,
  Validate,
  ValidateNested,
} from 'class-validator';
import { CreateCustomersAddressDto } from './create-customers-address.dto';
import IPersonalInfo from '@/shared/interface/IPersonalInfo';
import BaseCreateDto from '@/shared/dto/base-create.dto';
import { CustomerExistsRule } from '../constraints/customer-exists.constraint';

export class CreateCustomerDto extends BaseCreateDto implements IPersonalInfo {
  @IsOptional()
  @Validate(CustomerExistsRule)
  declare id: number;

  @IsOptional()
  @IsNumber()
  readonly status: number;

  @IsOptional()
  @IsObject({ message: 'address: deve ser um objeto.' })
  @Type(() => CreateCustomersAddressDto)
  @ValidateNested()
  declare address: CreateCustomersAddressDto;
}
