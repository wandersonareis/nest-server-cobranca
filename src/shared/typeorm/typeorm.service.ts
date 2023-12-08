import { IConfig } from '@/common/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmConfigService {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const database = this.config.get<IConfig['database']>('database');
    return {
      type: 'postgres',
      url: database?.databaseUrl,
      ssl: true,
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/**/*.migrations/.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      synchronize: true,
    };
  }
}
