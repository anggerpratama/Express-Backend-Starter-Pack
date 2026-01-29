import { IsEmail, IsNotEmpty } from "class-validator";

export class UserLoginDto {
    @IsEmail()
    @IsNotEmpty()
    username!: string;

    @IsNotEmpty()
    password!: string;
}