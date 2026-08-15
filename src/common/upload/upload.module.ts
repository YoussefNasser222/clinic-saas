import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { cloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [UploadService , cloudinaryProvider],
  exports: [UploadService],
})
export class UploadModule {}
