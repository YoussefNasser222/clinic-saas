import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({timestamps: true})
export class Token {
    @Prop({type : SchemaTypes.ObjectId , ref : "User" , required : true})
    userId : Types.ObjectId;
    @Prop({type : String , required : true})
    refreshToken : string
}

export const tokenSchema = SchemaFactory.createForClass(Token)