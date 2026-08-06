import { WorkingDay } from "@models/index";
import { Types } from "mongoose";

export class Clinic {
 readonly _id: Types.ObjectId;
  doctorId: Types.ObjectId;
  name: string;
  description?: string;
  phoneNumber: string;
  street: string;
  email: string;
  governorate: string;
  city: string;
  specialization: string;
  consultationPrice: number;
  workingDays: WorkingDay[]
}
