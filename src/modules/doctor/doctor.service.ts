import { ClinicRepository, DoctorRepository } from '@models/index';
import { Doctor } from '@modules/auth/entities/auth.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Clinic } from './entity';

@Injectable()
export class DoctorService {
  constructor(
    private readonly doctorRepo: DoctorRepository,
    private readonly clinicRepo: ClinicRepository,
  ) {}

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
    const updatedDoctor = await this.doctorRepo.update({ _id: id }, doctor, {
      returnDocument: 'after',
    });
    const { password, otp, otpExpired, isPaid, paidExpired, ...other } =
      updatedDoctor?.toObject() || {};
    return other;
  }
  async createClinic(clinic: Clinic, doctor: any) {
    const clinicExist = await this.clinicRepo.getOne({ doctorId: doctor._id });
    if (clinicExist) {
      throw new ConflictException('clinic already exist');
    }
    return await this.clinicRepo.create(clinic);
  }
  async updateClinic(clinic: Clinic, id: string) {
    const clinicExist = await this.clinicRepo.getOne({ _id: id });
    if (!clinicExist) {
      throw new NotFoundException('clinic not found');
    }
    return await this.clinicRepo.update({ _id: id }, clinic, {
      returnDocument: 'after',
    });
  }
  async getMyClinic(doctor: any) {
    const clinic = await this.clinicRepo.getOne(
      { doctorId: doctor._id },
      {},
      { populate: [{ path: 'doctorId', select: 'firstName lastName' }] },
    );
    if (!clinic) {
      throw new NotFoundException('clinic not found');
    }
    return clinic;
  }
}
