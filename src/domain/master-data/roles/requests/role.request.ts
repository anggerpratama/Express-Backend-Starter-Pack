import { Request } from "express";
import { DeleteEntityDto } from "../../../../infrastructure/dtos/delete-entity.dto";
import { RoleDto } from "../dtos/role.dto";

export interface RolesRequest extends Request {
    body : RoleDto  | DeleteEntityDto,
    params : any
    query: any
} 