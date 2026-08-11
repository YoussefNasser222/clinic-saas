import { Controller, Get } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Auth, User } from '@common/decorators';

@Controller('patient')
@Auth(['Patient'])
export class PatientController {
  constructor(private readonly patientService: PatientService) {}
  @Get()
  async getProfile(@User() user: any) {
    const patient = await this.patientService.getProfile(user);
    return {
      message: 'data retrieved successfully',
      success: true,
      data: { patient },
    };
  }
}
