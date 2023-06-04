import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async signUp(@Body() createUserDto: CreateUserDto) {
    await this.authService.userServicesInstance.checkUniqueProperties(
      ['email', 'cpf', 'phone'],
      createUserDto,
    );

    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  signIn(@Request() req: any) {
    return this.authService.signIn(req.user);
  }

  /* @Post('refresh')
  @UseGuards(JwtAuthGuard)
  refresh(@Req() { user }: Request): Promise<string | never> {
    return this.authService.refresh(<User>user);
  } */
}
