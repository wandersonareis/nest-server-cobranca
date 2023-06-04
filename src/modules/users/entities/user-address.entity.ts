import { BaseAddressEntity } from '@/shared/entities/baseAddressEntity';
import { Entity } from 'typeorm';

@Entity({ name: 'users_address' })
export class UserAddress extends BaseAddressEntity {}
