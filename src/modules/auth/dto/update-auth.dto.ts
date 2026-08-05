import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-auth.dto';

export class UpdatedDoctorDto extends PartialType(CreateDoctorDto) {}
export class UpdatedPatientDto extends PartialType(CreateDoctorDto) {}
