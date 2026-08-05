import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { UserMongoModule } from '@shared/user-mongo.module';
import { JwtService } from '@nestjs/jwt';
import { DoctorFactoryService } from './factory';

@Module({
  imports: [
    UserMongoModule
  ],
  controllers: [DoctorController],
  providers: [DoctorService, JwtService, DoctorFactoryService],
})
export class DoctorModule { }
