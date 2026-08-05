import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserMongoModule } from '@shared/user-mongo.module';
import { AuthFactoryService } from './factory';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenRepository, tokenSchema } from '@models/index';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([
      { name: Token.name, schema: tokenSchema }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthFactoryService, JwtService , TokenRepository],
})
export class AuthModule { }
