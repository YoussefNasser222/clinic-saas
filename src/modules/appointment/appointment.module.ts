import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { UserMongoModule } from '@shared/user-mongo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentRepository, appointmentSchema } from '@models/index';
import { JwtService } from '@nestjs/jwt';
import { AppointmentFactoryService } from './factory';
import { DoctorModule } from '@modules/doctor/doctor.module';

@Module({
  imports:[
    UserMongoModule,
    MongooseModule.forFeature([{name : Appointment.name , schema : appointmentSchema}]),
    DoctorModule
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService , JwtService , AppointmentFactoryService , AppointmentRepository],
})
export class AppointmentModule {}
