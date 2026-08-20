import { ClinicRepository } from '@models/index';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ClinicService {
  constructor(private readonly clinicRepo: ClinicRepository) {}
  async getClinics() {
    const clinics = await this.clinicRepo.getAll(
      {},
      {},
      {
        populate: {
          path: 'doctorId',
          select: 'firstName lastName image',
        },
      },
    );
    if (!clinics || clinics.length == 0) return [];
    return clinics;
  }
  async getClinicById(id: string) {
    const clinic = await this.clinicRepo.getOne({ _id: id },{},{
      populate : 'doctorId' , select : "firstName lastName image"
    });
    if (!clinic) {
      throw new NotFoundException('clinic not found');
    }
    return clinic;
  }
}
