import { DoctorRepository } from '@models/index';
import { Doctor } from '@modules/auth/entities/auth.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class DoctorService {
  constructor(private readonly doctorRepo: DoctorRepository) {}

  async findOne(id: string) {
    const doctor = await this.doctorRepo.getOne({ _id: id });
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    const { password, otp, otpExpired, ...other } = doctor.toObject();
    return other;
  }
  async update(doctor: Doctor, id: string | Types.ObjectId) {
    const doctorExist = await this.doctorRepo.getOne({ _id: id });
    if (!doctorExist) {
      throw new NotFoundException('Doctor not found');
    }
    const updatedDoctor = await this.doctorRepo.update(
      { _id: id },
      doctor,
      { returnDocument: 'after' },
    );
    const { password, otp, otpExpired, isPaid, paidExpired, ...other } =
      updatedDoctor?.toObject() || {};
    return other;
  }
}
