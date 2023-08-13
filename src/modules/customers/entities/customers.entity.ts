import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CustomersAddress } from './customers-address.entity';
import { BaseForEntity } from '@/shared/entities/base-info-entity';
import { Receivable } from '@/modules/receivables/entities/receivable.entity';
import IPersonalInfo from '@/shared/interface/IPersonalInfo';

@Entity()
@Index(['email', 'cpf', 'phone'], { unique: true })
export class Customers extends BaseForEntity implements IPersonalInfo {
  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, length: 14, nullable: false })
  cpf: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column({ nullable: true, default: 1 })
  status?: number;

  @OneToOne(() => CustomersAddress, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  address: CustomersAddress;

  @OneToMany(() => Receivable, (receivable) => receivable.customer, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'receivable_id' })
  receivables: Receivable[];
}
