import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UserMongoModule } from '@shared/user-mongo.module';
import { JwtService } from '@nestjs/jwt';
import { DoctorModule } from '../doctor/doctor.module';
import { AdminFactoryService } from './factory';

@Module({
  imports: [
    UserMongoModule,
    DoctorModule,
  ],
  controllers: [AdminController],
  providers: [AdminService , JwtService , AdminFactoryService],
})
export class AdminModule {}
