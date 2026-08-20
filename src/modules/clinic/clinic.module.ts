import { DoctorModule } from '@modules/doctor/doctor.module';
import { Module } from '@nestjs/common';
import { ClinicController } from './clinic.controller';
import { ClinicService } from './clinic.service';

@Module({
  imports: [
    DoctorModule,
  ],
  controllers: [ClinicController],
  providers: [ClinicService],
})
export class ClinicModule {}
