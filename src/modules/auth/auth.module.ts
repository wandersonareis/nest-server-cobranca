import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthHelper } from './auth.helper';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IConfig } from '@/common/interfaces';

const jwtFactory = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.get<IConfig['jwtConfig']>('jwtConfig')?.secret,
    signOptions: {
      expiresIn:
        configService.get<IConfig['jwtConfig']>('jwtConfig')?.expiresIn || '8h',
    },
  }),
};

@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync(jwtFactory)],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthHelper,
    JwtStrategy,
    LocalStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService, AuthHelper],
})
export class AuthModule {
  bla = 'bla';
}
