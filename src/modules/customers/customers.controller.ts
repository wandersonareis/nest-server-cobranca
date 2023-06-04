import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { SkipTakeQuery } from '@/shared/dto/skip-take-query.dto';
import { Customers } from './entities/customers.entity';
import { AuthGuard } from '../auth/auth.guard';
import { ReceivablesService } from '../receivables/receivables.service';
import { CreateReceivableDto } from '../receivables/dto/create-receivable.dto';
import SharedService from '@/shared/shared.service';
import CustomerIdParam from '@/shared/dto/customer-exists-param.dto';
import { RepositoryType } from '@/shared/types/types';

@Controller('customers')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly receivablesService: ReceivablesService,
    private readonly sharedService: SharedService,
  ) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    await this.customersService.checkUniqueProperties(
      ['email', 'cpf', 'phone'],
      createCustomerDto,
    );

    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll(@Query() query: SkipTakeQuery) {
    return this.customersService.findAll(query.skip, query.take);
  }

  @Get(':id')
  async findOne(@Param() param: CustomerIdParam) {
    const customer = await this.sharedService.findOneOrFail({
      id: param.id,
      repositoryType: RepositoryType.Customer,
    });

    return customer;
  }

  @Get('/search/name')
  async searchByName(@Query('letter') letter: string): Promise<Customers[]> {
    return await this.customersService.findAllByName(letter);
  }

  @Patch(':id')
  async update(
    @Param() param: CustomerIdParam,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const customer = await this.sharedService.findOneOrFail<Customers>({
      id: param.id,
      repositoryType: RepositoryType.Customer,
    });

    await this.customersService.checkUniqueProperties(
      ['email', 'cpf', 'phone'],
      updateCustomerDto,
      customer.id,
    );

    const updatedCustomer = await this.customersService.update(
      customer as Customers,
      updateCustomerDto,
    );
    return updatedCustomer;
  }

  @Delete(':id')
  remove(@Param() param: CustomerIdParam) {
    return this.customersService.remove(param.id);
  }

  @Post(':id/receivables')
  async createReceivable(
    @Param() param: CustomerIdParam,
    @Body() createReceivableDto: CreateReceivableDto,
  ) {
    const customer = await this.customersService.findOneById(param.id);
    if (!customer) return;

    return this.receivablesService.create(customer, createReceivableDto);
  }

  @Get(':id/receivables')
  async findReceivables(
    @Param() param: CustomerIdParam,
    @Query() query: SkipTakeQuery,
  ) {
    const customer = await this.customersService.findOneById(param.id);
    if (!customer) return;

    return this.receivablesService.findOneByCustomer(
      customer.id,
      query.skip,
      query.take,
    );
  }
}
