import { Type } from '@nestjs/common';

export interface IApiPropertyQuerySearchOptions {
  entity?: Type<unknown>;
  fields?: string[];
  allowFts?: boolean;
}
