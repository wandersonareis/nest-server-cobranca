import { Customers } from '@/modules/customers/entities/customers.entity';
import { Receivable } from '@/modules/receivables/entities/receivable.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { FindOneOptions, Repository } from 'typeorm';
import IPersonalInfo from './interface/IPersonalInfo';
import { ValidateById } from './types/types';

@Injectable()
export default class SharedService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Customers)
    private customerRepository: Repository<Customers>,
  ) {}

  async findOneOrFail<T>(decoded: ValidateById): Promise<T> {
    const founded = await this.findOneByIdAndType(decoded);

    if (!founded) {
      throw new NotFoundException(`${decoded.repositoryType} não encontrado`);
    }

    return founded as T;
  }

  async validateUser(decoded: any): Promise<IPersonalInfo> {
    const user = await this.findOneById(this.userRepository, decoded.id);

    if (!user) {
      throw new NotFoundException('Usuáriooo não encontrado');
    }

    return user;
  }
  async validateCustomer(decoded: any): Promise<IPersonalInfo> {
    const customer = await this.findOneById(
      this.customerRepository,
      decoded.id,
    );

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return customer;
  }

  isPasswordValid(password: string, userPassword: string): Promise<boolean> {
    return bcrypt.compare(password, userPassword);
  }

  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  private async findOne(repository: any, options: FindOneOptions) {
    return await repository.findOne(options);
  }

  private async findOneById(repository: any, id: number) {
    return await repository.findOne({ where: { id } });
  }

  private async findOneByIdAndType<T>(target: ValidateById): Promise<T> {
    switch (target.repositoryType) {
      case 'user':
        if (target.options) {
          return await this.findOne(this.userRepository, target.options);
        }

        return await this.findOneById(this.userRepository, target.id);
      case 'customer':
        if (target.options) {
          return await this.findOne(this.customerRepository, target.options);
        }

        return await this.findOneById(this.customerRepository, target.id);
      default:
        throw new Error('Tipo de repositório inválido.');
    }
  }
}
