import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ _id: false })
export class Medication {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String })
  dosage: string;
  @Prop({ type: String })
  frequency: string;
  @Prop({ type: String })
  duration: string;
}

export enum RecordVisibility {
  PRIVATE = 'private',
  SHARED = 'shared',
}

@Schema({ timestamps: true })
export class MedicalRecord {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Patient', required: true })
  patientId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Doctor', required: true })
  doctorId: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Appointment', required: true })
  appointmentId: Types.ObjectId;
  @Prop({ type: String })
  diagnosis: string;
  @Prop({ type: [Medication], default: [] })
  medications: Medication[];
  @Prop({ type: String })
  notes: string;

  @Prop({ type: String })
  prescriptionImageUrl: string; 

  @Prop({ type: String, enum: RecordVisibility, default: RecordVisibility.PRIVATE })
  visibility: RecordVisibility;
}