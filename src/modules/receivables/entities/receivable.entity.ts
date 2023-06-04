import { Customers } from '@/modules/customers/entities/customers.entity';
import { BaseForEntity } from '@/shared/entities/base-info-entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';

@Entity()
export class Receivable extends BaseForEntity {
  @Column({ type: 'text', default: '-' })
  description: string;

  @Column({ type: 'integer' })
  value: number;

  @Column({
    name: 'payment_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  paymentDate: Date;

  @Column({ type: 'integer', default: 1 })
  status: number;

  @ManyToOne(() => Customers, (customer) => customer.receivables, {
    onDelete: 'CASCADE',
  })
  customer: Customers;

  @RelationId((receivable: Receivable) => receivable.customer)
  customerId: number;
}
