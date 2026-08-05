import { DoctorRepository } from '@models/index';
import { UpdatedDoctorDto } from '@modules/auth/dto/update-auth.dto';
import { Doctor } from '@modules/auth/entities/auth.entity';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { Types } from 'mongoose';

@Injectable()
export class DoctorFactoryService {
  constructor(
    private readonly doctorRepo: DoctorRepository
  ) {}
  async updateDoctor(
    updateDoctorDto: UpdatedDoctorDto,
    id : string | Types.ObjectId
  ) {
    const doctor = await this.doctorRepo.getOne({ _id: id });
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    const updatedDoctor = new Doctor();
    const newPassword = updateDoctorDto.password
      ? await bcrypt.hash(updateDoctorDto.password, 10)
      : doctor.password;
    updatedDoctor.password = newPassword;
    updatedDoctor.email = updateDoctorDto.email || doctor.email;
    updatedDoctor.firstName = updateDoctorDto.firstName || doctor.firstName;
    updatedDoctor.phoneNumber =
      updateDoctorDto.phoneNumber || doctor.phoneNumber;
    updatedDoctor.lastName = updateDoctorDto.lastName || doctor.lastName;
    updatedDoctor.userName = updateDoctorDto.userName || doctor.userName;
    updatedDoctor.isPaid = doctor.isPaid;
    updatedDoctor.paidExpired = doctor.paidExpired;
    updatedDoctor.otp = doctor.otp;
    updatedDoctor.otpExpired = doctor.otpExpired;
    return updatedDoctor;
  }
}
