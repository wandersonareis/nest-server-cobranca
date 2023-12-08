import { IConfig } from '../interfaces';

export const config = (): IConfig => ({
  serverConfig: {
    port: Number(process.env.PORT || 3000),
  },
  database: {
    databaseUrl: String(process.env.DATABASE_URL),
  },
  jwtConfig: {
    secret: String(process.env.JWT_KEY),
    expiresIn: String(process.env.JWT_EXPIRES),
  },
});
