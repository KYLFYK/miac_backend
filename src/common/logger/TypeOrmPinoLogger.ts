import { PinoLogger } from 'nestjs-pino';
import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

export class TypeOrmPinoLogger implements TypeOrmLogger {
  constructor(
    private readonly logger: PinoLogger,
    private readonly options: LoggerOptions,
  ) {
    logger.setContext('TypeOrm');
  }

  logQuery(sql: string, parameters?: unknown[], queryRunner?: QueryRunner): void {
    if (
      this.options === 'all' ||
      this.options === true ||
      (this.options instanceof Array && this.options.indexOf('query') !== -1)
    ) {
      this.logger.debug({ sql, parameters }, 'execute query');
    }
  }

  logQueryError(
    error: string,
    sql: string,
    parameters?: unknown[],
    queryRunner?: QueryRunner,
  ): void {
    if (
      this.options === 'all' ||
      this.options === true ||
      (this.options instanceof Array && this.options.indexOf('error') !== -1)
    ) {
      this.logger.error({ error, sql, parameters }, 'query failed');
    }
  }

  logQuerySlow(
    executionTime: number,
    sql: string,
    parameters?: unknown[],
    queryRunner?: QueryRunner,
  ): void {
    this.logger.debug({ sql, executionTime, parameters }, 'query is slow');
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): void {
    if (
      this.options === 'all' ||
      (this.options instanceof Array && this.options.indexOf('schema') !== -1)
    ) {
      this.logger.debug('Build schema: %s', message);
    }
  }

  logMigration(message: string, queryRunner?: QueryRunner): void {
    this.logger.debug('Migration: %s', message);
  }

  log(level: 'log' | 'info' | 'warn', message: string, queryRunner?: QueryRunner): void {
    switch (level) {
      case 'log':
        if (
          this.options === 'all' ||
          (this.options instanceof Array &&
            this.options.indexOf('log') !== -1)
        )
          this.logger.debug(message);
        break;
      case 'info':
        if (
          this.options === 'all' ||
          (this.options instanceof Array &&
            this.options.indexOf('info') !== -1)
        )
          this.logger.debug(message);
        break;
      case 'warn':
        if (
          this.options === 'all' ||
          (this.options instanceof Array &&
            this.options.indexOf('warn') !== -1)
        )
          this.logger.warn(message);
        break;
    }
  }
}
