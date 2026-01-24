import 'reflect-metadata'

import express from 'express'
import config from './config/app'

//routers
import { corsOriginProvider } from './providers/cors-origin.provider';
import { appProvider } from './providers/app.provider'
import { routesProvider } from './providers/routes.provider'
import { AppDataSource } from './database/data-source';
import { setupContainer } from './providers/container.provider';

const expressApp = express();
expressApp.use(express.json());

async function bootstrap() {
    try {
        // 1. Initialize DB and DI Container
        await AppDataSource.initialize()
        console.log("✅ Database Connected");

        // 2. init DI Contianer
        await setupContainer(AppDataSource)

        // 2. init providers
        corsOriginProvider(expressApp)
        await appProvider(expressApp)
        routesProvider(expressApp)

        const PORT = config.app_port;
        expressApp.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
}

bootstrap();