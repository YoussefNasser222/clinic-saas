import { RecordVisibility } from '@models/index';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsMongoId, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Types } from 'mongoose';

class MedicationDto {
  @IsString()
  name: string;
  @IsOptional() @IsString()
  dosage?: string;
  @IsOptional() @IsString()
  frequency?: string;
  @IsOptional() @IsString()
  duration?: string;
}

export class CreateMedicalRecordDto {
  @IsMongoId()
  appointmentId: Types.ObjectId;

  @IsOptional() @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicationDto)
  medications?: MedicationDto[];

  @IsOptional() @IsString()
  notes?: string;

  @IsOptional() @IsString()
  prescriptionImageUrl?: string;
  @IsOptional()
  @IsEnum(RecordVisibility)
  visibility : RecordVisibility
}