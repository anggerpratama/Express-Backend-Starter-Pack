import { Router } from "express";
import { container } from "tsyringe";
import { MenuController } from "../../../domain/master-data/menus/controllers/menu.controller";
import { validateDto } from "../../../middleware/validate-dto";
import { MenuDto } from "../../../domain/master-data/menus/dtos/menu.dto";


export function createMenusRoutes(): Router {
    const router = Router();
    const menuController = container.resolve(MenuController)

    router.get('/' , menuController.index.bind(menuController))
    router.get('/:id' , menuController.show.bind(menuController))
    router.post('/' , validateDto(MenuDto)  , menuController.store.bind(menuController))
    router.post('/multiple' , menuController.multipleStore.bind(menuController))
    router.put('/:id' , validateDto(MenuDto) ,menuController.update.bind(menuController))
    router.delete('/' , menuController.delete.bind(menuController))

    return router
}