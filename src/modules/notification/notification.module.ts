import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationRepository,
  notificationSchema,
} from '@models/index';
import { UserMongoModule } from '@shared/user-mongo.module';
import { AppointmentModule } from '@modules/appointment/appointment.module';
import { NotificationFactoryService } from './factory';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: notificationSchema },
    ]),
    UserMongoModule,
    AppointmentModule,
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    NotificationRepository,
    NotificationFactoryService,
    JwtService,
  ],
})
export class NotificationModule {}
