import { Types } from "mongoose";

export class Doctor {
    readonly _id: Types.ObjectId
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phoneNumber: string;
    isPaid: boolean;
    paidExpired: Date;
    otp: string;
    otpExpired: Date;
    clinicId? : Types.ObjectId 
}

export class Patient {
    readonly _id: Types.ObjectId
    userName: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password : string
    otp: string;
    otpExpired: Date;
    createdBy: Types.ObjectId;
    
}
