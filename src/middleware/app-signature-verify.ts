import auth from "../config/auth";

import { Request, Response, NextFunction } from "express";
import { UnauthorizedAppError } from "../infrastructure/errors/UnauthorizedAppError";
import { NotFoundError } from "../infrastructure/errors/NotFoundError";
import { ResponseBuilders } from "../infrastructure/responses/ResponseBuilders";


export const appSignatureVerify = async (req : any , res: Response , next : NextFunction) => {
    try {

        const token = req.header('X-SIGNATURE').replace('SIGN:' , '')

        if (token == null) {
            throw new UnauthorizedAppError("Invalid Token Requets")
        }

        // check if token is static signature
        if (token != auth.static_token) {
            throw new NotFoundError("Anda tidak memiliki akses ke service ini. segera kontak admin [code:401-PS-1]")
        }

        next() 

    } catch (error) {
        if (error instanceof NotFoundError) {
            return new ResponseBuilders().errorsMessage(res , error.message , error.status , error)  
        }
        return new ResponseBuilders().errorsMessage(res , "Hak akses ditolak, Pastikan signature application key sudah terpasang" , 401 , error)
    }
}