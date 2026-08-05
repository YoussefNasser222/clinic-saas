
import { AbstractRepository } from "@models/abstraction.repository";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Token } from "./token.schema";
@Injectable()
export class TokenRepository extends AbstractRepository<Token> {
    constructor(@InjectModel(Token.name) private readonly tokenModel: Model<Token>) {
        super(tokenModel);
    }
}