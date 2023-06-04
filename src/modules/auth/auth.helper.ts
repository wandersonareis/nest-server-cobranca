import IPersonalInfo from '@/shared/interface/IPersonalInfo';
import SharedService from '@/shared/shared.service';
import { RepositoryType, UserPayload } from '@/shared/types/types';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthHelper {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sharedService: SharedService,
  ) {}

  public async decode(token: string): Promise<unknown> {
    return this.jwtService.decode(token);
  }

  public async validateUser(decoded: UserPayload): Promise<IPersonalInfo> {
    const user = await this.sharedService.findOneOrFail<IPersonalInfo>({
      id: decoded.id,
      repositoryType: RepositoryType.User,
    });

    return user;
  }

  public generateToken(user: IPersonalInfo): string {
    return this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  private async validate(token: string): Promise<boolean> {
    const decoded: unknown = this.jwtService.verify(token);

    if (!decoded) {
      throw new ForbiddenException();
    }

    const user = await this.sharedService.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválido');
    }
    return true;
  }
}
