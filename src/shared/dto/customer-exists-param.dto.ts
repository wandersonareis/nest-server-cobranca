import { CustomerExistsRule } from '@/modules/customers/constraints/customer-exists.constraint';
import { Validate } from 'class-validator';
import { IdParam } from './id-param.dto';

export default class CustomerIdParam extends IdParam {
  @Validate(CustomerExistsRule, {
    message: 'Cliente não encontradoooo',
  })
  declare id: number;
}
