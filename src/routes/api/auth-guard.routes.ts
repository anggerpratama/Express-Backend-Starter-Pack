import { Router } from "express";
import { tokenVerify } from "../../middleware/token-verify";
import { createAPIMasterDataRoutes } from "./master-data";
import { createUserRoutes } from "./user.routes";


export function createAuthGuardRoutes(): Router {
    const router = Router();

    router.use(tokenVerify)

    // grouped routes
    router.use('/master-data' , createAPIMasterDataRoutes())
    
    // single routes
    router.use('/users' , createUserRoutes())

    return router;
}