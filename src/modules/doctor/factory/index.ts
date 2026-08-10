import { ClinicRepository, DoctorRepository, PatientRepository } from '@models/index';
import {
  UpdatedDoctorDto,
  UpdatedPatientDto,
} from '@modules/auth/dto/update-auth.dto';
import { Doctor, Patient } from '@modules/auth/entities/auth.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { CreateClinicDto } from '../dto/create-clinic.dto';
import { Clinic } from '../entity';
import { UpdatedClinicDto } from '../dto/update-clinic.dto';
import { log } from 'console';
@Injectable()
export class DoctorFactoryService {
  constructor(
    private readonly doctorRepo: DoctorRepository,
    private readonly clinicRepo: ClinicRepository,
    private readonly patientRepo: PatientRepository,
  ) {}
  async updateDoctor(
    updateDoctorDto: UpdatedDoctorDto,
    id: string | Types.ObjectId,
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
  async createClinic(createClinicDto: CreateClinicDto, doctor: any) {
    const clinic = new Clinic();
    clinic.name = createClinicDto.name;
    clinic.description = createClinicDto.description;
    clinic.phoneNumber = createClinicDto.phoneNumber;
    clinic.street = createClinicDto.street;
    clinic.email = createClinicDto.email;
    clinic.city = createClinicDto.city;
    clinic.governorate = createClinicDto.governorate;
    clinic.specialization = createClinicDto.specialization;
    clinic.consultationPrice = createClinicDto.consultationPrice;
    clinic.doctorId = doctor._id;
    clinic.workingDays = createClinicDto.workingDays;
    return clinic;
  }
  async updateClinic(
    updateClinicDto: UpdatedClinicDto,
    doctor : any,
  ) {
    const clinic = new Clinic();
    const oldClinic = await this.clinicRepo.getOne({ doctorId : doctor._id });
    if (!oldClinic) {
      throw new NotFoundException('Clinic not found');
    }
    clinic.name = updateClinicDto.name || oldClinic.name;
    clinic.description = updateClinicDto.description || oldClinic.description;
    clinic.phoneNumber = updateClinicDto.phoneNumber || oldClinic.phoneNumber;
    clinic.street = updateClinicDto.street || oldClinic.street;
    clinic.email = updateClinicDto.email || oldClinic.email;
    clinic.city = updateClinicDto.city || oldClinic.city;
    clinic.governorate = updateClinicDto.governorate || oldClinic.governorate;
    clinic.specialization =
      updateClinicDto.specialization || oldClinic.specialization;
    clinic.consultationPrice =
      updateClinicDto.consultationPrice || oldClinic.consultationPrice;
    clinic.doctorId = oldClinic.doctorId;
    clinic.workingDays = updateClinicDto.workingDays || oldClinic.workingDays;

    return clinic;
  }
  async UpdatePatient(updatePatientDto: UpdatedPatientDto, user: any , id : string) {
    const oldPatient = await this.patientRepo.getOne({_id : id ,clinicId : user.clinicId})
    if(!oldPatient){
      throw new NotFoundException("patient Not found")
    }
    const patient = new Patient();
    patient.userName = updatePatientDto.userName || oldPatient.userName;
    patient.password = await bcrypt.hash(updatePatientDto.password || oldPatient.password, 10);
    patient.email = updatePatientDto.email || oldPatient.email;
    patient.firstName = updatePatientDto.firstName || oldPatient.firstName;
    patient.lastName = updatePatientDto.lastName || oldPatient.lastName;
    patient.phoneNumber = updatePatientDto.phoneNumber || oldPatient.phoneNumber;
    patient.otp = '';
    patient.otpExpired = new Date();
    return patient;
  }
}
