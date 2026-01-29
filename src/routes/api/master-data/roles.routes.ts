import { Router } from "express";
import { container } from "tsyringe";
import { validateDto } from "../../../middleware/validate-dto";
import { RoleDto } from "../../../domain/master-data/roles/dtos/role.dto";
import { RoleController } from "../../../domain/master-data/roles/controllers/role.controller";


export function createRolesRoutes(): Router {
    const router = Router();
    const roleController = container.resolve(RoleController)

    router.get('/' , roleController.index.bind(roleController))
    router.get('/:_id' , roleController.show.bind(roleController))
    router.post('/' , validateDto(RoleDto)  , roleController.store.bind(roleController))
    router.put('/:_id' , validateDto(RoleDto) ,roleController.update.bind(roleController))
    router.patch('/multi-delete' , roleController.delete.bind(roleController))

    return router
}