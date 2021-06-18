import { LogLevel } from '@nestjs/common';

import { IConfig } from './IConfig';

import { parseCorsOrigin } from '../util/parseCorsOrigin';

export const loadConfig = (): IConfig => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  docsPath: process.env.DOCS_PATH,
  logLevel: (process.env.NODE_ENV === 'test' ? 'error' : (process.env.LOG_LEVEL || 'info')) as LogLevel,
  typeOrmLoggerOptions: 'all',
  corsOrigin: parseCorsOrigin(process.env.ALLOWED_ORIGINS || '*'),
  postgresUrl: process.env.POSTGRES_URL,

  cookieName: process.env.COOKIE_NAME || 'rf_v1',
  cookieSecret: process.env.COOKIE_SECRET || 'secret',
  cookieDomain: process.env.COOKIE_DOMAIN,
  cookieSameSite: process.env.COOKIE_SAMESITE || 'none',
  cookieSecure: (process.env.COOKIE_SECURE || 'true') === 'true',

  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '60s',

  daDataToken: process.env.DADATA_TOKEN,

  authCodeExpiredTime: parseInt(process.env.AUTH_CODE_EXPIRED_TIME, 10) || 300000,
});
