import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { Paid } from '@common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '@common/upload';
import { PrescriptionExtractorService } from './prescription-extractor.service';

@Controller('medical-record')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService,
    private readonly uploadService: UploadService,
    private readonly prescriptionExtractorService : PrescriptionExtractorService
  ) {}
 @Post('extract')
 @Paid(['Doctor'])
 @UseInterceptors(FileInterceptor('image'))
 async extractPrescription(@UploadedFile() file: Express.Multer.File) {
    if(!file) {
      throw new NotFoundException('File is required');
    }
    const uploaded = await this.uploadService.uploadFileToCloud(file,'prescriptions') 
     const extracted = await this.prescriptionExtractorService.extractFromImage(
      file.buffer,
      file.mimetype,
    );
    return {
      message: 'extracted successfully, please review before saving',
      success: true,
      data: {
        imageUrl: uploaded.secure_url,
        extracted,
      },
    };
 }
}
