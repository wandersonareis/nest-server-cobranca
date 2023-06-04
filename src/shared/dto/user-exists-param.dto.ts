import { UserExistsRule } from '@/modules/users/constraints/user-exists.constraint';
import { Validate } from 'class-validator';
import { IdParam } from './id-param.dto';

export class UserExistsParam extends IdParam {
  @Validate(UserExistsRule, {
    message: 'user: não encontrado',
  })
  user: number;
}
