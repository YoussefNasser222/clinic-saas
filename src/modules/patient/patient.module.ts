import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { UserMongoModule } from '@shared/user-mongo.module';
import { JwtService } from '@nestjs/jwt';
import { AppointmentModule } from '@modules/appointment/appointment.module';
import { PatientFactoryService } from './factory';

@Module({
  imports : [
    UserMongoModule,
    AppointmentModule
  ],
  controllers: [PatientController],
  providers: [PatientService , JwtService , PatientFactoryService ],
})
export class PatientModule {}
