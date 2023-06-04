import SharedService from '@/shared/shared.service';
import { RepositoryType } from '@/shared/types/types';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly sharedService: SharedService) {}

  async validate(value: number) {
    const user = await this.sharedService.findOneOrFail({
      id: value,
      repositoryType: RepositoryType.User,
    });
    return !!user;
  }
}
