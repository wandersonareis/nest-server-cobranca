import SharedService from '@/shared/shared.service';
import { RepositoryType } from '@/shared/types/types';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class CustomerExistsRule implements ValidatorConstraintInterface {
  constructor(private sharedService: SharedService) {}

  async validate(value: number) {
    const customer = await this.sharedService.findOneOrFail({
      id: value,
      repositoryType: RepositoryType.Customer,
    });
    return !!customer;
  }
}
