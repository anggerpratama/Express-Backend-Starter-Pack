import { Router } from "express";
import { container } from "tsyringe";
import { validateDto } from "../../middleware/validate-dto";
import { UserController } from "../../domain/users/controllers/user.controller";
import { UserDto } from "../../domain/users/dtos/user.dto";


export function createUserRoutes(): Router {
    const router = Router();
    const userController = container.resolve(UserController)

    router.get('/' , userController.index.bind(userController))
    router.get('/:_id' , userController.show.bind(userController))
    router.post('/' , validateDto(UserDto)  , userController.store.bind(userController))
    router.put('/:_id' , validateDto(UserDto) ,userController.update.bind(userController))
    router.patch('/multi-delete' , userController.delete.bind(userController))

    return router
}