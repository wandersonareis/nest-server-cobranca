import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import IAddress from '../interface/IAddress';

export abstract class BaseAddressEntity implements IAddress {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ nullable: true })
  cep: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
