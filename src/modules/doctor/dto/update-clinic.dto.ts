
import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicDto } from './create-clinic.dto';

export class UpdatedClinicDto extends PartialType(CreateClinicDto) {}