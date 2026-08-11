import { Auth, Paid, User } from '@common/decorators';
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
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentFactoryService } from './factory';
import { IsPaid } from '@common/guards';

@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly appointmentFactoryService: AppointmentFactoryService,
  ) {}
  @Post()
  @Auth(['Patient'])
  async createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @User() user: any,
  ) {
    const appointment = this.appointmentFactoryService.create(
      createAppointmentDto,
      user,
    );
    const createdAppointment =
      await this.appointmentService.createAppointment(appointment);
    return {
      message: 'Appointment created successfully',
      success: true,
      data: { createdAppointment },
    };
  }
  @Delete(':id')
  @Auth(['Patient'])
  async DeleteAppointment(@User() user: any, @Param('id') id: string) {
    await this.appointmentService.deleteAppointment(user, id);
    return {
      message: 'appointment deleted successfully',
      success: true,
    };
  }
  @Get(':id')
  @Paid(['Doctor'])
  async getAppointment(@User() user: any, @Param('id') id: string) {
    const appointment = await this.appointmentService.getAppointment(user, id);
    return {
      message: 'appointment retrieved successfully',
      success: true,
      data: { appointment },
    };
  }
  @Get()
  @Paid(['Doctor'])
  async getAppointments(@User() user: any) {
    const appointments = await this.appointmentService.getAppointments(user);
    return {
      message: 'appointments retrieved successfully',
      success: true,
      data: { appointments },
    };
  }
  @Put(':id')
  @Paid(['Doctor'])
  async updateAppointment(
    @User() user: any,
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    const appointment = await this.appointmentService.updateAppointment(
      user,
      id,
      updateAppointmentDto,
    );
    return {
      message: 'appointment updated successfully',
      success: true,
      data: { appointment },
    };
  }
}
