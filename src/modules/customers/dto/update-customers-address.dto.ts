import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomersAddressDto } from './create-customers-address.dto';

export class UpdateCustomersAddressDto extends PartialType(
  CreateCustomersAddressDto,
) {}
