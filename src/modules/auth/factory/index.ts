import { BadRequestException, Injectable } from "@nestjs/common";
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
    async createPatient(createPatientDto: CreatePatientDto) {
        const patient = new Patient()
        patient.userName = createPatientDto.userName
        patient.password = await bcrypt.hash(createPatientDto.password, 10)
        patient.email = createPatientDto.email
        patient.firstName = createPatientDto.firstName
        patient.lastName = createPatientDto.lastName
        patient.phoneNumber = createPatientDto.phoneNumber
        patient.otp = '';
        patient.otpExpired = new Date();
        return patient
    }
}