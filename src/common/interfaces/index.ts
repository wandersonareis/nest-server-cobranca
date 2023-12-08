export interface IConfig {
  serverConfig: {
    port: number;
  };
  database: {
    databaseUrl: string;
  };
  jwtConfig: {
    secret: string;
    expiresIn: string;
  };
}
