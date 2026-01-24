import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class UserDto {
    @IsString()
    @IsNotEmpty()
    phoneNumber!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    nik!: string;

    @IsString()
    @IsNotEmpty()
    nip!: string | null;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsOptional()
    profilePicture?: string | null;

    @IsBoolean()
    @IsNotEmpty()
    status!: boolean;

    @IsString()
    @IsNotEmpty()
    roleId!: string;
}