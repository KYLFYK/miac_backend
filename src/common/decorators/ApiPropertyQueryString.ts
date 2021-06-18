import { ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ApiPropertyQueryString(defaultValue = ''): PropertyDecorator {
  const apiPropertyOptions: ApiPropertyOptions = {
    type: String,
    default: `${defaultValue}`,
  };

  const transformer = ({ value: string }): string => {
    return string || defaultValue;
  };

  return function (target: unknown, propertyKey: string): void {
    ApiPropertyOptional(apiPropertyOptions)(target, propertyKey);
    IsNumber()(target, propertyKey);
    Type(() => String)(target, propertyKey);
    Expose()(target, propertyKey);
    Transform(transformer)(target, propertyKey);
  };
}
