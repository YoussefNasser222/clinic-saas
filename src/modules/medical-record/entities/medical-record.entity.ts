import { Medication, RecordVisibility } from '@models/index';
import { Types } from 'mongoose';

export class MedicalRecord {
  readonly _id: Types.ObjectId;
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  appointmentId: Types.ObjectId;
  diagnosis: string;
  medications?: Medication[];
  notes: string;

  prescriptionImageUrl: string;

  visibility: RecordVisibility;
}
