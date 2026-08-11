import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { Appointment } from '../entities/appointment.entity';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';

@Injectable()
export class AppointmentFactoryService {
  create(createAppointmentDto: CreateAppointmentDto, user: any) {
    const appointment = new Appointment();

    const startTime = new Date(createAppointmentDto.date);

    const endTime = new Date(startTime.getTime() + 15 * 60 * 1000);

    appointment.clinicId = createAppointmentDto.clinicId;
    appointment.doctorId = createAppointmentDto.doctorId;

    appointment.date = startTime;
    appointment.startTime = startTime;
    appointment.endTime = endTime;

    appointment.patientId = user._id;

    appointment.notes = createAppointmentDto.notes || '';

    return appointment;
  }
}
