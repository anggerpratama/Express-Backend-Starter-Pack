import config from "../config/app";
import cors from "cors";
import { Express } from "express";

export function corsOriginProvider(appProvider: Express):void {
    const allowedOrigins = config.app_cors;

    const options: cors.CorsOptions = {
        origin: allowedOrigins
    };

    appProvider.use(cors(options));
    console.log("✅ Cors Origin Provider Initialized");
}