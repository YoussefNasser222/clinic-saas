import { Auth, Paid, User } from '@common/decorators';
import {
  UpdatedDoctorDto
} from '@modules/auth/dto/update-auth.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdatedClinicDto } from './dto/update-clinic.dto';
import { DoctorFactoryService } from './factory';
import { FileInterceptor } from '@nestjs/platform-express';
import { log } from 'console';

@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly doctorFactoryService: DoctorFactoryService,
  ) {}
  @Get()
  @Paid(['Doctor'])
  async findOne(@User() user: any) {
    const doctor = await this.doctorService.findOne(user._id);
    return {
      message: 'data retrieved successfully',
      success: true,
      data: doctor,
    };
  }
  @Put()
  @Paid(['Doctor'])
  async update(@Body() updateDoctorDto: UpdatedDoctorDto, @User() user: any) {
    const doctor = await this.doctorFactoryService.updateDoctor(
      updateDoctorDto,
      user._id,
    );
    const updatedDoctor = await this.doctorService.update(doctor, user._id);
    return {
      message: 'data updated successfully',
      success: true,
      data: updatedDoctor,
    };
  }
  @Post('register/clinic')
  @Paid(['Doctor'])
  async createClinic(
    @Body() createClinicDto: CreateClinicDto,
    @User() user: any,
  ) {
    const clinic = await this.doctorFactoryService.createClinic(
      createClinicDto,
      user._id,
    );
    const createdClinic = await this.doctorService.createClinic(clinic, user);
    return {
      message: 'clinic created successfully',
      success: true,
      data: createdClinic,
    };
  }
  @Put('clinic')
  @Paid(['Doctor'])
  async updateClinic(
    @Body() updateClinicDto: UpdatedClinicDto,
    @User() user: any,
  ) {
    const clinic = await this.doctorFactoryService.updateClinic(
      updateClinicDto,
      user,
    );
    const updatedClinic = await this.doctorService.updateClinic(clinic, user);
    return {
      message: 'clinic updated successfully',
      success: true,
      data: updatedClinic,
    };
  }
  @Get('clinic')
  @Paid(['Doctor'])
  async getMyClinic(@User() user: any) {
    const clinic = await this.doctorService.getMyClinic(user);
    return {
      message: 'clinic retrieved successfully',
      success: true,
      data: clinic,
    };
  }
  @Delete()
  @Paid(['Doctor'])
  async deleteDoctor(@User() user: any) {
    await this.doctorService.deleteDoctor(user);
    return {
      message: 'doctor Deleted successfully',
      success: true,
    };
  }
  @Put('profile-image')
  @UseInterceptors(FileInterceptor('image'))
  @Paid(["Doctor"])
  async updateProfileImage(@UploadedFile() file: Express.Multer.File, @User() user: any) {
    const result = await this.doctorService.updateProfileImage(file, user);
    return {
      message: 'profile-image updated successfully',
      success: true,
      data: {
        public_id: result?.image?.public_id,
        secure_url: result?.image?.secure_url,
      },
    };
  }
}
