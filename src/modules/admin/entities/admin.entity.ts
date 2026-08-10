import { Role } from '@models/index';
import { Types } from 'mongoose';

export class Admin {
  readonly _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  role: Role;
  otp: string;
  otpExpired: Date;
}
