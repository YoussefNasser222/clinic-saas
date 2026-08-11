import { AbstractRepository } from "@models/abstraction.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Appointment } from "./appointment.schema";
@Injectable()
export class AppointmentRepository extends AbstractRepository<Appointment> {
    constructor(@InjectModel(Appointment.name) private readonly appointmentModel: Model<Appointment>) {
        super(appointmentModel);
    }
}