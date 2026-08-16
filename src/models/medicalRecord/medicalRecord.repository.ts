import { AbstractRepository } from "@models/abstraction.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MedicalRecord } from "./medicalRecord.schema";

@Injectable()
export class MedicalRecordRepository extends AbstractRepository<MedicalRecord> {
    constructor(@InjectModel(MedicalRecord.name) private readonly medicalRecordModel: Model<MedicalRecord>) {
        super(medicalRecordModel);
    }
}