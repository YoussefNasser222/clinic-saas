import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Auth, User } from '@common/decorators';
import { DoctorFactoryService } from './factory';
import { UpdatedDoctorDto } from '@modules/auth/dto/update-auth.dto';
import { log } from 'console';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdatedClinicDto } from './dto/update-clinic.dto';

@Controller('doctor')
@Auth(['Doctor'])
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly doctorFactoryService: DoctorFactoryService,
  ) {}
  @Get()
  async findOne(@User() user: any) {
    const doctor = await this.doctorService.findOne(user.id);
    return {
      message: 'data retrieved successfully',
      success: true,
      data: doctor,
    };
  }
  @Put()
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
  @Put('clinic/:id')
  async updateClinic(
    @Body() updateClinicDto: UpdatedClinicDto,
    @Param('id') id: string,
    @User() user: any,
  ) {
    const clinic = await this.doctorFactoryService.updateClinic(
      updateClinicDto,
      id,
    );
    const updatedClinic = await this.doctorService.updateClinic(clinic, id);
    return {
      message: 'clinic updated successfully',
      success: true,
      data: updatedClinic,
    };
  }
  @Get('clinic')
  async getMyClinic(@User() user : any){
 const clinic = await this.doctorService.getMyClinic(user);
 return {
  message: 'clinic retrieved successfully',
  success: true,
  data: clinic,
 };
  }

}
