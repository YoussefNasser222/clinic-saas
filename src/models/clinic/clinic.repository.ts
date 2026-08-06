import { AbstractRepository } from "@models/abstraction.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Clinic } from "./clinic.schema";
@Injectable()
export class ClinicRepository extends AbstractRepository<Clinic> {
    constructor(@InjectModel(Clinic.name) private readonly clinicModel: Model<Clinic>) {
        super(clinicModel);
    }
}