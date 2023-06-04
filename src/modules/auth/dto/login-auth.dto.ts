import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import IUserLogin from '../interface/IUserLogin';

export class LoginDto implements IUserLogin {
  @IsString({ message: 'O e-mail deve ser uma string.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  @IsEmail({}, { message: 'O e-mail não é válido.' })
  readonly email: string;

  @IsString({ message: 'O campo password deve ser uma string.' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/u, {
    message: `O campo password deve ter no mínimo 8 caracteres,
    contendo pelo menos uma letra maiúscula, uma letra minúscula e um número.`,
  })
  readonly password: string;
}
