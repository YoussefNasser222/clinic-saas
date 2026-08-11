import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MinLength
} from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  @Length(14, 14)
  nationalId: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  phoneNumber: string;
}

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  @Length(14, 14)
  nationalId: string;
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  phoneNumber: string;
  @IsEmail()
  email: string;
}

export class LoginDto {
   @IsString()
  @IsNotEmpty()
  @Length(14, 14)
  nationalId: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  otp: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  newPassword: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
