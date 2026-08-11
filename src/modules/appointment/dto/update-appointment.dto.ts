import { AppointmentStatus } from '@models/index';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAppointmentDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}
