import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Auth, User } from '@common/decorators';
import { DoctorFactoryService } from './factory';
import { UpdatedDoctorDto } from '@modules/auth/dto/update-auth.dto';
import { log } from 'console';

@Controller('doctor')
@Auth(['Doctor'])
export class DoctorController {
  constructor(private readonly doctorService: DoctorService,
    private readonly doctorFactoryService : DoctorFactoryService
  ) {}
  @Get()
  async findOne(@User() user : any) {
    const doctor =  await this.doctorService.findOne(user.id);
    return {
      message : "data retrieved successfully",
      success : true,
      data: doctor
    }
  }
  @Put()
  async update(@Body() updateDoctorDto: UpdatedDoctorDto, @User() user : any) {
    const doctor = await this.doctorFactoryService.updateDoctor(updateDoctorDto , user._id)
    const updatedDoctor = await this.doctorService.update(doctor, user._id)
    return {
      message : "data updated successfully",
      success : true,
      data : updatedDoctor
    }
  }
}
