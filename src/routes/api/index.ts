import { Router } from 'express';
import { createUserRoutes } from './user.routes';
import { createAPIMasterDataRoutes } from './master-data';
import { createAuthRoutes } from './auth.routes';
import { createAuthGuardRoutes } from './auth-guard.routes';

export function createAPIRoutes(): Router {
    const router = Router();

    // public auth routes
    router.use('/auth' , createAuthRoutes())

    // protected routes
    router.use(createAuthGuardRoutes())

    return router
}