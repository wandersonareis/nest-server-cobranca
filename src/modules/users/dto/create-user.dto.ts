import { Type } from 'class-transformer';
import { IsString, Matches } from 'class-validator';
import { CreateUserAddressDto } from './create-user-address.dto';
import ICreateUser from '../interface/ICreateUser';
import BaseCreateDto from '@/shared/dto/base-create.dto';

export class CreateUserDto extends BaseCreateDto implements ICreateUser {
  @IsString({ message: 'O campo password deve ser uma string.' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/u, {
    message: `O campo password deve ter no mínimo 8 caracteres,
      contendo pelo menos uma letra maiúscula, uma letra minúscula e um número.`,
  })
  password: string;

  @Type(() => CreateUserAddressDto)
  readonly address: CreateUserAddressDto;
}
