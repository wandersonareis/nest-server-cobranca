import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RepositoryType, UserResponse } from '@/shared/types/types';
import { AuthHelper } from './auth.helper';
import IUserLogin from './interface/IUserLogin';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import ICreateUser from '../users/interface/ICreateUser';
import { CreateUserDto } from '../users/dto/create-user.dto';
import SharedService from '@/shared/shared.service';
import IPersonalInfo from '@/shared/interface/IPersonalInfo';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly helper: AuthHelper,
    private readonly sharedService: SharedService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<ICreateUser> {
    return this.userService.create(createUserDto);
  }

  async validateUser(email: string, password: string): Promise<IPersonalInfo> {
    const user = await this.sharedService.findOneOrFail({
      id: 1000,
      repositoryType: RepositoryType.User,
      options: { where: { email } },
    });

    const isValidPassword = await this.sharedService.isPasswordValid(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    return user as IPersonalInfo;
  }

  async signIn(user: IPersonalInfo): Promise<UserResponse> {
    const payload: UserResponse = {
      id: user.id,
      name: user.name,
      access_token: this.helper.generateToken(user),
    };

    return payload;
  }

  async refresh(user: User): Promise<string> {
    return this.helper.generateToken(user);
  }

  get userServicesInstance(): UsersService {
    return this.userService;
  }
}
