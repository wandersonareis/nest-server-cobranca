import { Exclude } from 'class-transformer';
import { IsOptional, IsString, Length, Matches } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import IAddress from '../interface/IAddress';

export abstract class BaseAddress implements IAddress {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @IsOptional()
  @IsString({ message: 'cep:  "XXXXX-XXX" (sem espaços)' })
  @Matches(/^\d{5}-\d{3}$/, {
    message: 'cep: "XXXXX-XXX" (sem espaços)',
  })
  readonly cep: string;

  @IsOptional()
  @IsString({ message: 'street: deve ser uma string' })
  readonly street: string;

  @IsOptional()
  @IsString({ message: 'complement: deve ser uma string' })
  readonly complement: string;

  @IsOptional()
  @IsString({ message: 'district: deve ser uma string' })
  readonly district: string;

  @IsOptional()
  @IsString({ message: 'city: deve ser uma string' })
  readonly city: string;

  @IsOptional()
  @Length(2, 2, { message: 'state: deve ter exatamente 2 caracteres' })
  readonly state: string;
}
