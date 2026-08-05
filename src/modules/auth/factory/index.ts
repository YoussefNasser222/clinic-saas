import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { CreateDoctorDto, CreatePatientDto } from "../dto/create-auth.dto";
import { Doctor, Patient } from "../entities/auth.entity";

@Injectable()
export class AuthFactoryService {
    async createDoctor(createDoctorDto: CreateDoctorDto) {
        const doctor = new Doctor()
        doctor.userName = createDoctorDto.userName
        doctor.password = await bcrypt.hash(createDoctorDto.password, 10)
        doctor.email = createDoctorDto.email
        doctor.firstName = createDoctorDto.firstName
        doctor.lastName = createDoctorDto.lastName
        doctor.phoneNumber = createDoctorDto.phoneNumber
        doctor.isPaid = false
        doctor.paidExpired = new Date();
        doctor.otp = '';
        doctor.otpExpired = new Date();
        return doctor
    }
    async createPatient(createpatientDto: CreatePatientDto) {
        const patient = new Patient()
        patient.userName = createpatientDto.userName
        patient.password = await bcrypt.hash(createpatientDto.password, 10)
        patient.email = createpatientDto.email
        patient.firstName = createpatientDto.firstName
        patient.lastName = createpatientDto.lastName
        patient.phoneNumber = createpatientDto.phoneNumber
        patient.otp = '';
        patient.otpExpired = new Date();
        return patient
    }
}