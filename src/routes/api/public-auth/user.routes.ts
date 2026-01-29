import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "../../../domain/users/controllers/user.controller";


export function createPublicAuthUserRoutes(): Router {
    const router = Router();
    const userController = container.resolve(UserController)

    router.get('/access-menus' , userController.getUserAccessMenu.bind(userController))

    return router
}