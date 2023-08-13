import IPersonalInfo from '@/shared/interface/IPersonalInfo';
import SharedService from '@/shared/shared.service';
import { RepositoryType, UserPayload } from '@/shared/types/types';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
      repositoryType: RepositoryType.User,
      options: { where: { id: decoded.id } },
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
}
