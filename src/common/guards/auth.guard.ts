
import { PUBLIC } from '@common/decorators';
import { Role, UserRepository } from '@models/index';
import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly reflector : Reflector
    ) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        try {
            const publicValue = this.reflector.get(PUBLIC , context.getHandler());
            if (publicValue) {
                return true;
            }
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization;
            if (!token) {
                throw new BadRequestException('Token is required');
            }
            const payload: { userId: string, email: string, role: Role } = this.jwtService.verify(token, {
                secret: this.configService.get("JWT_SECRET")
            })
            const user = await this.userRepo.getOne({ _id: payload.userId })
            if (!user) {
                throw new BadRequestException('User not found');
            }
            request.user = user;
            return true;
        } catch (error: any) {
            throw new BadRequestException(error.message);

        }
    }
}
