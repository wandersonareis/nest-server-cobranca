import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import IAddress from '../interface/IAddress';

export default abstract class BaseCreateDto {
  @IsOptional()
  id: number;

  @IsNotEmpty({ message: 'name: nome não pode estar vazio.' })
  @IsString({ message: 'name: deve ser uma string.' })
  @Matches(/^[\p{L} ]+$/u, {
    message: 'name: deve conter apenas letras e espaços.',
  })
  @Length(3, 60, { message: 'name: deve ter entre 3 e 60 caracteres.' })
  name: string;

  @IsString({ message: 'email: deve ser uma string.' })
  @IsNotEmpty({ message: 'email: não pode estar vazio.' })
  @IsEmail({}, { message: 'email: não é válido.' })
  email: string;

  @IsString({ message: 'cpf: deve ser uma string.' })
  @IsNotEmpty({ message: 'cpf: não pode estar vazio.' })
  @Length(14, 14, { message: 'cpf: deve ter 14 caracteres.' })
  cpf: string;

  @IsString({ message: 'phone: deve ser uma string.' })
  @IsNotEmpty({ message: 'phone: não pode estar vazio.' })
  phone: string;

  @IsOptional()
  @IsObject({ message: 'address: O endereço deve ser um objeto.' })
  @ValidateNested()
  address: IAddress;
}
