import { LogLevel } from '@nestjs/common';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

export interface IConfig {
  port: number;
  docsPath: string;
  logLevel: LogLevel;
  typeOrmLoggerOptions: LoggerOptions;
  corsOrigin: (string | RegExp)[];
  postgresUrl: string;

  cookieName: string;
  cookieSecret: string;
  cookieDomain: string;
  cookieSecure: boolean;
  cookieSameSite: string;

  jwtSecret: string;
  jwtExpiresIn: string;

  daDataToken: string;

  authCodeExpiredTime: number;
}
