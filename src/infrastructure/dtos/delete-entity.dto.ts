import { IsArray, IsString } from "class-validator";

export class DeleteEntityDto {
    @IsArray()
    @IsString({ each: true })
    ids!: string | string[];
}