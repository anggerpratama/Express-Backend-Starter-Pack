import { Router } from "express";
import { createPublicAuthUserRoutes } from "./user.routes";


export function createPublicAuthRoutes(): Router {
    const router = Router();
    
    // single routes
    router.use('/users' , createPublicAuthUserRoutes())

    return router;
}