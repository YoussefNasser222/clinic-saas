import { Module } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { MedicalRecordController } from './medical-record.controller';
import { UserMongoModule } from '@shared/user-mongo.module';
import { JwtService } from '@nestjs/jwt';
import { UploadModule } from '@common/upload';
import { PrescriptionExtractorService } from './prescription-extractor.service';

@Module({
  imports : [
    UserMongoModule,
    UploadModule
  ],
  controllers: [MedicalRecordController],
  providers: [MedicalRecordService , JwtService,PrescriptionExtractorService],
})
export class MedicalRecordModule {}
