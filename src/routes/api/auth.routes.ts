import { Router } from "express";
import { AuthController } from "../../domain/auth/controllers/auth.controller";
import { container } from "tsyringe";
import { validateDto } from "../../middleware/validate-dto";
import { UserLoginDto } from "../../domain/auth/dtos/user-login.dto";

export function createAuthRoutes(): Router {
    const router = Router();
    const authController = container.resolve(AuthController);

    router.post('/login', validateDto(UserLoginDto) ,authController.login.bind(authController));

    return router;
}