import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login-auth.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const body = plainToClass(LoginDto, request.body);
    const errMsg: Record<string, any> = {};
    const errors: ValidationError[] = await validate(body);

    errors.forEach((err) => {
      if (!err.constraints) return;
      errMsg[err.property] = Object.values(err.constraints);
    });

    if (Object.keys(errMsg).length) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: errMsg,
      });
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
