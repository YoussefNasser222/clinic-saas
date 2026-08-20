import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { validateFileMagicNumber } from './file.validation';
import { compressImage } from './image.compress';
import * as multer from 'multer';
@Injectable()
export class UploadService {
  async uploadFileToCloud(file: Express.Multer.File, folder: string) {
    try {
      await validateFileMagicNumber(file.buffer);
      const compressedBuffer = await compressImage(file.buffer);
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            resolve(result);
          },
        );
        uploadStream.end(compressedBuffer);
      });

      return result;
    } catch (error: any) {
      throw new BadRequestException(error?.message || 'File upload failed');
    }
  }
  async deleteFileFromCloud(publicId: string) {
    await cloudinary.uploader.destroy(publicId);
  }
}
