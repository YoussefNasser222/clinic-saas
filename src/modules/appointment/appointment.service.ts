import { AppointmentRepository, DoctorRepository } from '@models/index';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Appointment } from './entities/appointment.entity';
import { log } from 'console';

@Injectable()
export class AppointmentService {
  constructor(
    private readonly appointmentRepo: AppointmentRepository,
    private readonly doctorRepo: DoctorRepository,
  ) {}

  async createAppointment(appointment: Appointment) {
    const doctor = await this.doctorRepo.getOne({ _id: appointment.doctorId });
    if (!doctor) {
      throw new NotFoundException('doctor not found');
    }
    if (doctor.clinicId.toString() !== appointment.clinicId.toString()) {
      throw new UnauthorizedException();
    }
    const appointmentExist = await this.appointmentRepo.getOne({
      doctorId: appointment.doctorId,
      startTime: { $lt: appointment.endTime },
      endTime: { $gt: appointment.startTime },
    });

    if (appointmentExist) {
      throw new ConflictException('Appointment already exists');
    }
    return await this.appointmentRepo.create(appointment);
  }
  async deleteAppointment(user: any, id: string) {
    const appointment = await this.appointmentRepo.deleteOne({
      _id: id,
      patientId: user._id,
    });
    if (appointment.deletedCount === 0) {
      throw new NotFoundException('appointment not found');
    }
  }

  async getAppointments(user: any) {
    const appointments = await this.appointmentRepo.getAll(
      {
        doctorId: user._id,
      },
      {},
      {
        populate: [
          { path: 'patientId', select: '-password -otp -otpExpired' },
          { path: 'clinicId' },
        ],
      },
    );
    if (!appointments || appointments.length === 0) {
      throw new NotFoundException('appointments not found');
    }
    return appointments;
  }

  async getAppointment(user: any, id: string) {
    const appointment = await this.appointmentRepo.getOne(
      {
        _id: id,
        doctorId: user._id,
      },
      {},
      {
        populate: [
          {
            path: 'patientId',
            select: '-password -otp -otpExpired',
          },
          { path: 'clinicId' },
        ],
      },
    );
    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }
    return appointment;
  }

  async updateAppointment(user: any, id: string, updateAppointmentDto: any) {
    const appointment = await this.appointmentRepo.update(
      { _id: id, doctorId: user._id },
      { status: updateAppointmentDto.status },
    );
    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }
    return appointment;
  }
}
