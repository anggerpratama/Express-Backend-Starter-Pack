import { IsArray, IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class MenuDto {
    @IsString()
    @IsNotEmpty({ message: "Name is required" })
    name!: string;

    @IsString()
    @IsNotEmpty({ message: "Web Slug is required" })
    webSlug!: string;

    @IsString()
    @IsNotEmpty({ message: "API Slug is required" })
    apiSlug!: string;

    @IsArray()
    @IsString({ each: true })
    actionMenu!: string[];

    @IsString()
    iconCode!: string;

    @IsBoolean()
    status!: boolean;
    
    @IsBoolean()
    isRecursive!: boolean;
}