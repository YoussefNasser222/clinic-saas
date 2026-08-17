import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Notification {
  readonly _id: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Patient', required: true })
  patientId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Doctor', required: true })
  doctorId: Types.ObjectId;
  @Prop({ type: String, required: true, trim: true })
  title: string;
  @Prop({ type: String, required: true, trim: true })
  message: string;
  @Prop({ type: Boolean, default: false })
  isRead: boolean;
}

export const notificationSchema = SchemaFactory.createForClass(Notification);
