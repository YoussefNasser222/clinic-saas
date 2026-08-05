import { User } from "@models/common/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true, discriminatorKey: 'role' })
export class Doctor extends User {
    @Prop({ type: String, required: true })
    phoneNumber: string;
    @Prop({ type: Boolean, required: true, default: false })
    isPaid: boolean;
    @Prop({ type: Date })
    paidExpired: Date;
    @Prop({ type: String, required: true })
    firstName: string;
    @Prop({ type: String, required: true })
    lastName: string;
}

export const doctorSchema = SchemaFactory.createForClass(Doctor)