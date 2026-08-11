import { PatientRepository } from '@models/index';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepo: PatientRepository) {}
  async getProfile(user: any) {
    const patient = await this.patientRepo.getOne({ _id: user._id });
    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    const {password , otp , otpExpired , ...other} = patient.toObject()
    return other;
  }
}
