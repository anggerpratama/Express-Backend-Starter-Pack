import { Request } from "express";
import { UserLoginDto } from "../dtos/user-login.dto";

export interface UserAuthRequest extends Request {
    body : UserLoginDto
    params : any
}