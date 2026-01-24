import { Request } from "express";
import { UserDto } from "../dtos/user.dto";
import { DeleteEntityDto } from "../../../infrastructure/dtos/delete-entity.dto";

export interface UsersRequest extends Request {
    body : UserDto  | DeleteEntityDto,
    params : any
    query: any
} 