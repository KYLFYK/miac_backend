import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

interface IApiPropertyQueryNumberOptions {
  default: number;
  description: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApiPropertyQueryNumber(options: IApiPropertyQueryNumberOptions): PropertyDecorator {
  const apiPropertyOptions: ApiPropertyOptions = {
    type: String,
    ...options,
  };

  const transformer = ({ value }: { value: string }): number => {
    return Math.max(0, parseInt(value, 10) || options.default);
  };

  return function (target: unknown, propertyKey: string): void {
    ApiPropertyOptional(apiPropertyOptions)(target, propertyKey);
    IsNumber()(target, propertyKey);
    Type(() => Number)(target, propertyKey);
    Expose()(target, propertyKey);
    Transform(transformer)(target, propertyKey);
  };
}
