import { User } from "@models/common/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true, discriminatorKey: 'role' })
export class Admin extends User {
    @Prop({ type: String, required: true })
    firstName: string;
    @Prop({ type: String, required: true })
    lastName: string;
}

export const adminSchema = SchemaFactory.createForClass(Admin);