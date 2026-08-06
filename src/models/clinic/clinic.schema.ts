import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { SchemaTypes, Types } from 'mongoose';
@Schema({ _id: false  })
export class WorkingDay {
  @Prop({ type: String, required: true })
  day: string;
  @Prop({ type: Date, required: true })
  from: Date;
  @Prop({ type: Date, required: true })
  to: Date;
}

@Schema({ timestamps: true })
export class Clinic {
  readonly _id: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Doctor', required: true })
  doctorId: Types.ObjectId;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String })
  description?: string;
  @Prop({ type: String })
  phoneNumber: string;
  @Prop({ type: String, required: true })
  street: string;
  @Prop({ type: String })
  email: string;
  @Prop({ type: String, required: true })
  governorate: string;
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  specialization: string;
  @Prop({ type: Number, required: true })
  consultationPrice: number;
  @Prop({ type: [WorkingDay] })
  workingDays: WorkingDay[];
}

export const clinicSchema = SchemaFactory.createForClass(Clinic);
