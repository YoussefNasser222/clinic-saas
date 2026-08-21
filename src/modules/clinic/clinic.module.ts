import { DoctorModule } from '@modules/doctor/doctor.module';
import { Module } from '@nestjs/common';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './clinic.service';
import { AppointmentModule } from '@modules/appointment/appointment.module';

@Module({
  imports: [
    DoctorModule,
    AppointmentModule
  ],
  controllers: [ClinicController],
  providers: [ClinicService],
})
export class ClinicModule {}
