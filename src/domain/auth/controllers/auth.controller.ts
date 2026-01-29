import { Response } from "express";
import { injectable } from "tsyringe";
import { Controller } from "../../controller";
import { AuthService } from "../services/auth.service";
import { UserAuthRequest } from "../requests/auth.request";
import { UserDto } from "../../users/dtos/user.dto";
import { UserLoginDto } from "../dtos/user-login.dto";

@injectable()
export class AuthController extends Controller {

    constructor(
        // services
        private readonly authService: AuthService
    ) {
        super()
    }

    public async login(req: UserAuthRequest , res: Response) {

        try {
            
            let result = await this.authService.login(req.body as UserLoginDto)
            this.responseBuilder.successMessage(res , "Sukses login" , result)

        } catch (error) {
            console.log(error)
            this.errorHandleResponse(error , "Failed to process login" , res)
        }

    }
    
}