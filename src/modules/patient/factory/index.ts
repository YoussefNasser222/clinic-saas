import { PatientRepository } from '@models/index';
import { UpdatedPatientDto } from '@modules/auth/dto/update-auth.dto';
import { Patient } from '@modules/auth/entities/auth.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PatientFactoryService {
  constructor(private readonly patientRepo: PatientRepository) {}

  async update(user: any, updatePatientDto: UpdatedPatientDto) {
    const oldPatient = await this.patientRepo.getOne({ _id: user._id });
    if (!oldPatient) {
      throw new NotFoundException('patient not found');
    }
    const patient = new Patient();
    patient.email = updatePatientDto.email || oldPatient.email;
    patient.firstName = updatePatientDto.firstName || oldPatient.firstName;
    patient.lastName = updatePatientDto.lastName || oldPatient.lastName;
    patient.password = updatePatientDto.password
      ? await bcrypt.hash(updatePatientDto.password, 10)
      : oldPatient.password;
    patient.otp = oldPatient.otp;
    patient.otpExpired = oldPatient.otpExpired;
    patient.createdBy = oldPatient.createdBy;
    return patient;
  }
  async updatePatientById(
    id: string,
    updatePatientDto: UpdatedPatientDto
  ) {
    const oldPatient = await this.patientRepo.getOne({ _id: id });
    if(!oldPatient){
        throw new NotFoundException('patient not found')
    }
    const patient = new Patient();
    patient.email = updatePatientDto.email || oldPatient.email;
    patient.firstName = updatePatientDto.firstName || oldPatient.firstName;
    patient.lastName = updatePatientDto.lastName || oldPatient.lastName;
    patient.password = updatePatientDto.password
      ? await bcrypt.hash(updatePatientDto.password, 10)
      : oldPatient.password;
    patient.otp = oldPatient.otp;
    patient.otpExpired = oldPatient.otpExpired;
    patient.createdBy = oldPatient.createdBy;
    return patient;
  }
}
