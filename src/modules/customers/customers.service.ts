import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, ILike, Not, Repository } from 'typeorm';
import { Customers } from './entities/customers.entity';
import { CustomersAddress } from './entities/customers-address.entity';
import * as diacritics from 'diacritics';
import { Receivable } from '../receivables/entities/receivable.entity';
import { ObjectKey } from '@/shared/types/types';
import IPersonalInfo from '@/shared/interface/IPersonalInfo';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private readonly customersRepository: Repository<Customers>,
    @InjectRepository(CustomersAddress)
    private readonly customersAddressRepository: Repository<CustomersAddress>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    const { address: customerAddress_req, ...customer_req } = createCustomerDto;
    const customer = this.customersRepository.create(customer_req);

    if (customerAddress_req) {
      customer.address =
        this.customersAddressRepository.create(customerAddress_req);
    }

    return this.customersRepository.save(customer);
  }

  findAll(skip?: number, take?: number) {
    return this.customersRepository.find({
      skip,
      take,
      relations: ['address', 'receivables'],
    });
  }

  findAllByName(letter: string): Promise<Customers[]> {
    const search = diacritics.remove(letter);
    const clientes = this.customersRepository.find({
      where: {
        name: ILike(`%${search}%`),
      },
    });
    return clientes;
  }

  findOne(parameter: any) {
    return this.customersRepository.findOne(parameter);
  }

  findOneById(id: number) {
    return this.customersRepository.findOne({
      where: { id },
      relations: ['address', 'receivables'],
    });
  }

  findOneByEmail(email: string) {
    return this.customersRepository.findOne({
      where: { email },
      relations: ['address', 'receivables'],
    });
  }

  async update(
    customer: Customers,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<IPersonalInfo> {
    this.customersRepository.merge(customer, updateCustomerDto);

    return this.customersRepository.save(customer);
  }

  remove(id: number) {
    return this.customersRepository.delete(id);
  }

  async checkUniqueProperties(
    properties: string[],
    customerDto: CreateCustomerDto | UpdateCustomerDto,
    customerId?: number,
  ): Promise<void> {
    if (!properties || !properties.length) {
      return;
    }
    for (const property of properties) {
      const key = property as ObjectKey<typeof customerDto>;

      if (!customerDto[key]) {
        continue;
      }

      const query: FindOneOptions<Customers> = customerId
        ? { where: { [property]: customerDto[key], id: Not(customerId) } }
        : { where: { [property]: customerDto[key] } };

      const existingUser = await this.customersRepository.findOne(query);

      if (existingUser) {
        throw new BadRequestException(
          `${property}: Já existe um cliente cadastrado com este ${property}`,
        );
      }
    }
  }
}
