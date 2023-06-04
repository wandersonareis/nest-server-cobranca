import { Exclude } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { UserAddress } from './user-address.entity';
import { BaseForEntity } from '@/shared/entities/base-info-entity';
import IPersonalInfo from '@/shared/interface/IPersonalInfo';

@Entity({ name: 'users' })
@Index(['email', 'cpf', 'phone'], { unique: true })
export class User extends BaseForEntity implements IPersonalInfo {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', unique: true, length: 100 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', unique: true, length: 14, nullable: true })
  cpf?: string;

  @Column({ type: 'varchar', unique: true, length: 20, nullable: true })
  phone?: string;

  @OneToOne(() => UserAddress, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  address: UserAddress;
}
