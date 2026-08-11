import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
@Schema({ timestamps: true })
export class Appointment {
  readonly _id: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Patient', required: true })
  patientId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Doctor', required: true })
  doctorId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Clinic', required: true })
  clinicId: Types.ObjectId;
  @Prop({ type: Date, required: true })
  date: Date;
  @Prop({ type: Date, required: true })
  startTime: Date;
  @Prop({ type: Date, required: true })
  endTime: Date;
  @Prop({
    type: String,
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
    required: true,
  })
  status: AppointmentStatus;
  @Prop({ type: String })
  notes?: string;
}

export const appointmentSchema = SchemaFactory.createForClass(Appointment);
