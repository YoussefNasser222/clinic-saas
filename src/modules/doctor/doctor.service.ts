import {
  ClinicRepository,
  DoctorRepository,
  PatientRepository,
} from '@models/index';
import { Doctor, Patient } from '@modules/auth/entities/auth.entity';
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
    private readonly patientRepo: PatientRepository,
  ) {}

  async findOne(id: string) {
    const doctor = await this.doctorRepo.getOne(
      { _id: id },
      {},
      {
        populate: { path: 'clinicId' },
      },
    );
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
    const createdClinic = await this.clinicRepo.create(clinic);
    await this.doctorRepo.update(
      { _id: doctor._id },
      {
        clinicId: createdClinic._id,
      },
    );
    return createdClinic;
  }
  async updateClinic(clinic: Clinic, doctor: any) {
    const clinicExist = await this.clinicRepo.getOne({ doctorId: doctor._id });
    if (!clinicExist) {
      throw new NotFoundException('clinic not found');
    }
    return await this.clinicRepo.update({ doctorId: doctor._id }, clinic, {
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
  async updatePatient(patient: Patient, id: string) {
    const patientExist = await this.patientRepo.getOne({ _id: id });
    if (!patientExist) {
      throw new NotFoundException('patient not found');
    }
    const updatedPatient = await this.patientRepo.update({ _id: id }, patient, {
      returnDocument: 'after',
    });
    const { password, otp, otpExpired, ...other } =
      updatedPatient?.toObject() || {};
    return other;
  }
}
