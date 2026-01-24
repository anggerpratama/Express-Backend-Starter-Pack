import { Express } from "express";
import { createMainRoutes } from "../routes";
import { createAPIRoutes } from "../routes/api";

export function routesProvider(appProvider: Express):void {
    appProvider.use(createMainRoutes())
    appProvider.use('/api' , createAPIRoutes())
    console.log("✅ Routes Initialized");
}