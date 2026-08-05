import { AbstractRepository } from "@models/abstraction.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Doctor } from "./doctor.schema";
@Injectable()
export class DoctorRepository extends AbstractRepository<Doctor> {
    constructor(@InjectModel(Doctor.name) private readonly doctorModel: Model<Doctor>) {
        super(doctorModel);
    }
}