import { User } from "@models/common/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true, discriminatorKey: 'role' })
export class Patient extends User {
    @Prop({ type: String, required: true })
    firstName: string;
    @Prop({ type: String, required: true })
    lastName: string;
    @Prop({ type: String, required: true })
    phoneNumber: string;
    @Prop({ type: SchemaTypes.ObjectId, ref: "Doctor" , required: true })
    doctorId: Types.ObjectId;
}

export const patientSchema = SchemaFactory.createForClass(Patient)