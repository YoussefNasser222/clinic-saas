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
import { NotificationModule } from './modules/notification/notification.module';
import devConfig from '@config/env/dev.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
        };
      },
    }),
    AuthModule,
    DoctorModule,
    AdminModule,
    AppointmentModule,
    PatientModule,
    UploadModule,
    MedicalRecordModule,
    NotificationModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
