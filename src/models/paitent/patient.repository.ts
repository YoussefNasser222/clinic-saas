import { AbstractRepository } from "@models/abstraction.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Patient } from "./patient.schema";
@Injectable()
export class PatientRepository extends AbstractRepository<Patient> {
    constructor(@InjectModel(Patient.name) private readonly patientModel: Model<Patient>) {
        super(patientModel);
    }
}