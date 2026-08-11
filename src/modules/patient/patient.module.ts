import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { UserMongoModule } from '@shared/user-mongo.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports : [
    UserMongoModule
  ],
  controllers: [PatientController],
  providers: [PatientService , JwtService],
})
export class PatientModule {}
