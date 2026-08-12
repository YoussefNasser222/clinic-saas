import { Transform } from 'class-transformer';
import {
  IsDate,
  IsMongoId,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateAppointmentPatientDto {
  @IsMongoId()
  doctorId: Types.ObjectId;
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date(), { message: 'Date must be in the future' })
  date: Date;
  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateAppointmentDoctorDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date(), { message: 'Date must be in the future' })
  date: Date;
  @IsString()
  @IsOptional()
  notes?: string;
}
