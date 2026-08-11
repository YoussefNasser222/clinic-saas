import { Auth, Paid, User } from '@common/decorators';
import { IsPaid } from '@common/guards';
import {
  UpdatedDoctorDto,
  UpdatedPatientDto,
} from '@modules/auth/dto/update-auth.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdatedClinicDto } from './dto/update-clinic.dto';
import { DoctorFactoryService } from './factory';

@Controller('doctor')
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly doctorFactoryService: DoctorFactoryService,
  ) {}
  @Get()
  @Paid(['Doctor'])
  async findOne(@User() user: any) {
    const doctor = await this.doctorService.findOne(user.id);
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
  @Put('patient/:id')
  @Paid(['Doctor'])
  async updatePatient(
    @Body() updatePatientDto: UpdatedPatientDto,
    @Param('id') id: string,
    @User() user: any,
  ) {
    const patient = await this.doctorFactoryService.UpdatePatient(
      updatePatientDto,
      user,
      id,
    );
    const updatedPatient = await this.doctorService.updatePatient(patient, id);
    return {
      message: 'patient updated successfully',
      success: true,
      data: updatedPatient,
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
}
