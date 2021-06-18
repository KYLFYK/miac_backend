
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ClientIpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return request.ips[0];
  },
);
