import { AppointmentStatus } from '@models/index';
import { Types } from 'mongoose';

export class Appointment {
  readonly _id: Types.ObjectId;
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  clinicId: Types.ObjectId;
  date: Date;
  startTime?: Date;
  endTime?: Date;
  status: AppointmentStatus;
  notes?: string;
  queueNumber?: number;
}
