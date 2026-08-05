

import { PUBLIC, ROLE } from '@common/decorators';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { log } from 'console';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const publicValue = this.reflector.get(PUBLIC , context.getHandler());
    if (publicValue) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roles = this.reflector.getAllAndMerge(ROLE , [
        context.getHandler(),
        context.getClass(),
    ])
    if(!roles.includes(user.role)) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}
