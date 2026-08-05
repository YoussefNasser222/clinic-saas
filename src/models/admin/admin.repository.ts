import { AbstractRepository } from "@models/abstraction.repository";
import { Admin } from "./admin.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
@Injectable()
export class AdminRepository extends AbstractRepository<Admin> {
    constructor(@InjectModel(Admin.name) private readonly adminModel: Model<Admin>) {
        super(adminModel);
    }
}