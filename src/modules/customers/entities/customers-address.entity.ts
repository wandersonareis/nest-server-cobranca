import { BaseAddressEntity } from '@/shared/entities/baseAddressEntity';
import { Entity } from 'typeorm';

@Entity({ name: 'customers_address' })
export class CustomersAddress extends BaseAddressEntity {}
