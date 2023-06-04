import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customers } from './entities/customers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersAddress } from './entities/customers-address.entity';
import { AuthModule } from '../auth/auth.module';
import { ReceivablesModule } from '../receivables/receivables.module';
import { ReceivablesService } from '../receivables/receivables.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard';
import { CustomerExistsRule } from './constraints/customer-exists.constraint';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customers, CustomersAddress]),
    AuthModule,
    ReceivablesModule,
  ],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomerExistsRule,
    ReceivablesService,
    JwtService,
    AuthGuard,
  ],
  exports: [CustomersService, TypeOrmModule],
})
export class CustomersModule {}
