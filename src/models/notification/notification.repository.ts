
import { AbstractRepository } from "@models/abstraction.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Notification } from "./notification.schema";

@Injectable()
export class NotificationRepository extends AbstractRepository<Notification> {
    constructor(@InjectModel(Notification.name) private readonly notificationModel: Model<Notification>) {
        super(notificationModel);
    }
}