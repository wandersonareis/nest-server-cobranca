import { CustomersModule } from '@/modules/customers/customers.module';
import { UsersModule } from '@/modules/users/users.module';
import { Global, Module } from '@nestjs/common';
import SharedService from './shared.service';

@Global()
@Module({
  imports: [UsersModule, CustomersModule],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
