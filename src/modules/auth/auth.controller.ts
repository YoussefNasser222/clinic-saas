import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateDoctorDto, CreatePatientDto, LoginDto, ResetPasswordDto } from './dto/create-auth.dto';
import { AuthFactoryService } from './factory';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly authFactoryService: AuthFactoryService
  ) { }
  @Post('register/doctor')
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    const doctor = await this.authFactoryService.createDoctor(createDoctorDto)
    const createdDoctor = await this.authService.createDoctor(doctor);
    return {
      message: "doctor created successfully",
      success: true,
      data: { createdDoctor }
    }
  }
  @Post('register/patient')
  async createPatient(@Body() createPatientDto: CreatePatientDto) {
    const patient = await this.authFactoryService.createPatient(createPatientDto)
    const createdPatient = await this.authService.createPatient(patient);
    return {
      message: "patient created successfully",
      success: true,
      data: { createdPatient }
    }
  }
  @Post('login')
  async login(@Body() loginDto : LoginDto){
 const result = await this.authService.login(loginDto)
 return {
  message :  "user login successfully",
  success : true,
  data : result
 }
  }
  @Post('refresh-token')
  async refreshToken(@Body("refreshToken") refreshToken: string) {
    const result = await this.authService.refreshToken(refreshToken);
    return {
      message: "token refreshed successfully",
      success: true,
      data: { result }
    }
  }
  @Post('send-otp')
  async sendOtp(@Body('email') email: string) {
    await this.authService.sendOtp(email);
    return {
      message: "otp sent successfully",
      success: true,
    }
  }
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
     await this.authService.resetPassword(resetPasswordDto);
    return {
      message: "password reseted successfully",
      success: true,
    }
  }
}
