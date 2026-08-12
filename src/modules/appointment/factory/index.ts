import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateAppointmentDoctorDto,
  CreateAppointmentPatientDto,
} from '../dto/create-appointment.dto';
import { Appointment } from '../entities/appointment.entity';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { log } from 'console';
import {
  ClinicRepository,
  DoctorRepository,
  PatientRepository,
} from '@models/index';
import { Types } from 'mongoose';

@Injectable()
export class AppointmentFactoryService {
  constructor(
    private readonly doctorRepo: DoctorRepository,
    private readonly patientRepo: PatientRepository,
  ) {}
  async createAppointmentByPatient(
    createAppointmentPatientDto: CreateAppointmentPatientDto,
    user: any,
  ) {
    const appointment = new Appointment();
    const doctor = await this.doctorRepo.getOne({
      _id: createAppointmentPatientDto.doctorId,
    });
    if (!doctor) {
      throw new NotFoundException('doctor not found');
    }
    if (!doctor.clinicId) {
      throw new NotFoundException('clinic not found');
    }
    const startTime = new Date(createAppointmentPatientDto.date);

    const endTime = new Date(startTime.getTime() + 15 * 60 * 1000);
    appointment.clinicId = doctor.clinicId;
    appointment.doctorId = createAppointmentPatientDto.doctorId;

    appointment.date = startTime;
    appointment.startTime = startTime;
    appointment.endTime = endTime;

    appointment.patientId = user._id;

    appointment.notes = createAppointmentPatientDto.notes || '';

    return appointment;
  }

  async createAppointmentByDoctor(
    createAppointmentDoctorDto: CreateAppointmentDoctorDto,
    user: any,
    id: string,
  ) {
    const appointment = new Appointment();
    if (!user.clinicId) {
      throw new NotFoundException('clinic not found');
    }
    const patient = await this.patientRepo.getOne({ _id: id });
    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    const startTime = new Date(createAppointmentDoctorDto.date);

    const endTime = new Date(startTime.getTime() + 15 * 60 * 1000);
    appointment.clinicId = user.clinicId;
    appointment.patientId = new Types.ObjectId(id);
    appointment.doctorId = user._id;

    appointment.date = startTime;
    appointment.startTime = startTime;
    appointment.endTime = endTime;
    appointment.notes = createAppointmentDoctorDto.notes || '';

    return appointment;
  }
}
