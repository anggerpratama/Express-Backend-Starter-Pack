import { Router } from 'express';
import { createMenusRoutes } from './menus.routes';
import { createRolesRoutes } from './roles.routes';

export function createAPIMasterDataRoutes(): Router {
    const router = Router();

    router.use('/menus' , createMenusRoutes())
    router.use('/roles' , createRolesRoutes())

    return router
}