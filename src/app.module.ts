import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { AdminModule } from './modules/admin/admin.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { PatientModule } from './modules/patient/patient.module';
import { UploadModule } from './common/upload/upload.module';
import { MedicalRecordModule } from './modules/medical-record/medical-record.module';
import devConfig from '@config/env/dev.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [devConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get('DB_URL'),
        }
      }
    }),
    AuthModule,
    DoctorModule,
    AdminModule,
    AppointmentModule,
    PatientModule,
    UploadModule,
    MedicalRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
