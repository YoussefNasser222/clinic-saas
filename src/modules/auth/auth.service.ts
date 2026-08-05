import { DoctorRepository, PatientRepository, TokenRepository, UserRepository } from '@models/index';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { LoginDto, ResetPasswordDto } from './dto/create-auth.dto';
import { Doctor, Patient } from './entities/auth.entity';
import { generateOtp, generateOtpExpire, sendMail } from '@common/helpers';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly patientRepo: PatientRepository,
    private readonly doctorRepo: DoctorRepository,
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly tokenRepo: TokenRepository,
    private readonly configService: ConfigService,
  ) { }
  async createDoctor(doctor: Doctor) {
    const userExist = await this.userRepo.getOne({ userName: doctor.userName })
    if (userExist) {
      throw new ConflictException("doctor already exist")
    }
    const newDoctor = await this.doctorRepo.create(doctor)
    const { password, isPaid, paidExpired,otp , otpExpired, ...other } = newDoctor.toObject()
    return other
  }
  async createPatient(patient: Patient) {
    const userExist = await this.userRepo.getOne({ userName: patient.userName })
    if (userExist) {
      throw new ConflictException("patient already exist")
    }
    const newPatient = await this.patientRepo.create(patient)
    const { password, otp , otpExpired, ...other } = newPatient.toObject()
    return other
  }
  async login(loginDto: LoginDto) {
    const user = await this.userRepo.getOne({ userName: loginDto.userName })
    if (!user) {
      throw new NotFoundException("user not found")
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password)
    if (!isMatch) {
      throw new BadRequestException("invalid cradential")
    }
    const accessToken = this.jwtService.sign({
      userId: user._id,
      role: user.role
    }, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: "1d",
    })
    const refreshToken = this.jwtService.sign({
      userId: user._id,
      role: user.role
    }, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: "7d"
    })
    const token = await this.tokenRepo.create({
      userId: user._id,
      refreshToken
    })
    return { accessToken, refreshToken }
  }
  async refreshToken(refreshToken: string) {
    const token = await this.tokenRepo.getOne({ refreshToken })
    if (!token) {
      throw new NotFoundException("token not found")
    }
    const user = await this.userRepo.getOne({ _id: token.userId })
    if (!user) {
      throw new NotFoundException("user not found")
    }
    const accessToken = this.jwtService.sign({
      userId: user._id,
      role: user.role
    }, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: "1d",
    })
    const newRefreshToken = this.jwtService.sign({
      userId: user._id,
      role: user.role
    }, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: "7d"
    })
    await this.tokenRepo.update({ userId: user._id }, { refreshToken: newRefreshToken })
    return { accessToken, refreshToken: newRefreshToken }
  }
  async sendOtp(email: string) {
    const user = await this.userRepo.getOne({ email })
    if (!user) {
      throw new NotFoundException("user not found")
    }
    const otp = generateOtp()
    const otpExpired = generateOtpExpire()
    await sendMail({
      to: email,
      subject: "Reset Password",
      html: `<h1>Your OTP is ${otp}</h1>`
    })
    await this.userRepo.update({ email }, { otp, otpExpired })
  }
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userRepo.getOne({ email: resetPasswordDto.email })
    if (!user) {
      throw new NotFoundException("user not found")
    }
    if (user.otp !== resetPasswordDto.otp) {
      throw new BadRequestException("invalid otp")
    }
    if (user.otpExpired < new Date()) {
      throw new BadRequestException("otp expired")
    }
    const hashPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10)
    await this.userRepo.update({ email: resetPasswordDto.email }, { password: hashPassword })
  }
}
