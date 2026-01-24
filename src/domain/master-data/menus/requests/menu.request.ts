import { Request } from "express";
import { MenuDto } from "../dtos/menu.dto";
import { DeleteEntityDto } from "../../../../infrastructure/dtos/delete-entity.dto";

export interface MenusRequest extends Request {
    body : MenuDto | MenuDto[] | DeleteEntityDto,
    params : any
    query: any
} 