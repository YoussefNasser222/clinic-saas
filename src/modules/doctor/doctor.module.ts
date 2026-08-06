import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { UserMongoModule } from '@shared/user-mongo.module';
import { JwtService } from '@nestjs/jwt';
import { DoctorFactoryService } from './factory';
import { MongooseModule } from '@nestjs/mongoose';
import { Clinic, ClinicRepository, clinicSchema } from '@models/index';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([
      {name : Clinic.name , schema : clinicSchema}
    ])
  ],
  controllers: [DoctorController],
  providers: [DoctorService, JwtService, DoctorFactoryService , ClinicRepository],
})
export class DoctorModule { }
