import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class IsPaid implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Unauthorized , doctors only');
    }

    const now = new Date();

    if (!user.isPaid || !user.paidExpired || user.paidExpired < now) {
      throw new ForbiddenException('Subscription expired');
    }

    return true;
  }
}
