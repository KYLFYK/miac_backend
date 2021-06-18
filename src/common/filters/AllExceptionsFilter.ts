import {
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { QueryFailedError } from 'typeorm';

const ENUM_VALUE_INVALID_RE = /for enum [a-z]+_([A-z_]+)_[a-z]+/;
const FK_CONSTRAINT_RE = /on table \"(?<parent>.*)\" violates foreign key constraint \"(?<fk>.*)\" on table \"(?<child>.*)\"/;

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  @InjectPinoLogger(AllExceptionsFilter.name) private logger: PinoLogger;

  catch(originalError: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    // const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let error = originalError;

    if (originalError instanceof QueryFailedError) {
      error = this.transformQueryError(request, originalError);
    }

    if (!(error instanceof HttpException)) {
      this.logger.error(error);
    }

    return super.catch(error, host);
  }

  private transformQueryError(request: Request, error: Error): Error {
    const customError = this.getEnumErrorIfNeeded(error.message)
      || this.getFkConstraintErrorIfNeeded(error.message, request.method);

    return customError || error;
  }

  private getEnumErrorIfNeeded(errorMessage: string): BadRequestException {
    const match = errorMessage.match(ENUM_VALUE_INVALID_RE);

    if (match === null) return;

    return new BadRequestException(`Invalid enum value of field ${match[1]}`);
  }

  private getFkConstraintErrorIfNeeded(errorMessage: string, requestMethod: string): UnprocessableEntityException {
    const match = errorMessage.match(FK_CONSTRAINT_RE);

    if (match === null) return;

    const method = requestMethod.toLowerCase() === 'delete'
      ? 'delete'
      : 'update';

    const message = `Unable to ${method} a '${match.groups.parent}' due to association with '${match.groups.child}'`;

    return new UnprocessableEntityException(message);
  }
}
