import { Injectable } from '@nestjs/common';
import { CreateReceivableDto } from './dto/create-receivable.dto';
import { UpdateReceivableDto } from './dto/update-receivable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receivable } from './entities/receivable.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Customers } from '../customers/entities/customers.entity';

@Injectable()
export class ReceivablesService {
  constructor(
    @InjectRepository(Receivable)
    private readonly receivablesRepository: Repository<Receivable>,
  ) {}
  create(customer: Customers, createReceivableDto: CreateReceivableDto) {
    createReceivableDto.customerId = customer.id;
    const receivable = this.receivablesRepository.create(createReceivableDto);
    customer.receivables.push(receivable);

    return this.receivablesRepository.save(receivable);
  }

  findAll(skip?: number, take?: number) {
    return this.receivablesRepository.find({ skip, take });
  }

  findOne(parameter: FindOneOptions<Receivable>) {
    return this.receivablesRepository.findOne(parameter);
  }

  findOneById(id: number) {
    return this.receivablesRepository.findOne({
      where: { id },
    });
  }
  findOneByCustomer(customerId: number, skip?: number, take?: number) {
    return this.receivablesRepository.find({
      skip,
      take,
      where: { customer: { id: customerId } },
    });
  }

  update(receivable: Receivable, updateReceivableDto: UpdateReceivableDto) {
    this.receivablesRepository.merge(receivable, updateReceivableDto);

    return this.receivablesRepository.save(receivable);
  }

  remove(id: number) {
    return this.receivablesRepository.delete(id);
  }
}
