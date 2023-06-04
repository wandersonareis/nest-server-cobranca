import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthUser } from './decorators/user.decorator';
import IPersonalInfo from '@/shared/interface/IPersonalInfo';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/search/name')
  async searchByName(
    @Query('letter') letter: string,
  ): Promise<IPersonalInfo[]> {
    return await this.usersService.findAllByName(letter);
  }

  @Get()
  findOne(@AuthUser() user: IPersonalInfo): IPersonalInfo {
    return user;
  }

  @Patch()
  async update(@Body() updateUserDto: IPersonalInfo, @AuthUser() user: User) {
    await this.usersService.checkUniqueProperties(
      ['email', 'cpf', 'phone'],
      updateUserDto,
      user.id,
    );

    return this.usersService.update(user, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
