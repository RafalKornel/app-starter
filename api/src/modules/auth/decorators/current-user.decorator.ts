import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export const CurrentUser = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    return req.user as JwtPayload | undefined;
  },
);
