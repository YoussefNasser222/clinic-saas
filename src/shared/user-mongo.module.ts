import { Admin, AdminRepository, adminSchema, Doctor, DoctorRepository, doctorSchema, Patient, PatientRepository, patientSchema, User, UserRepository, userSchema } from "@models/index";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name, schema: userSchema, discriminators: [
                    { name: Patient.name, schema: patientSchema },
                    { name: Doctor.name, schema: doctorSchema },
                    { name: Admin.name, schema: adminSchema }
                ]
            }
        ])
    ],
    controllers: [],
    providers: [UserRepository, AdminRepository, DoctorRepository, PatientRepository],
    exports: [UserRepository, AdminRepository, DoctorRepository, PatientRepository],
})
export class UserMongoModule {

}