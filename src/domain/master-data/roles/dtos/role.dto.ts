import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class RoleDto {
    @IsString()
    @IsNotEmpty({ message: "Name is required" })
    name!: string;

    @IsString()
    @IsNotEmpty({ message: "Web Slug is required" })
    code!: string;

    @IsBoolean()
    @IsNotEmpty({ message: "API Slug is required" })
    isAdmin!: boolean;

    @IsBoolean()
    isUserApp!: boolean;

    @IsArray()
    @IsNotEmpty({ message: "Menus is required" })
    @ValidateNested()
    @Type(() => RoleMenusDto)
    menus!: RoleMenusDto[];

    @IsBoolean()
    @IsNotEmpty({ message: "Status is required" })
    status!: boolean;
}

export class RoleMenusDto {
    @IsString()
    id!: string

    @IsNumber()
    order!: number;

    @IsArray()
    @IsString({ each: true })
    action!: string[];

    @IsOptional()
    @IsString()
    groupName!: string;

    @IsOptional()
    @IsString()
    groupId!: string;
}