import express, { Request, Response, Router } from 'express';
import { container } from 'tsyringe';
import { HomeController } from '../domain/home/controllers/home.controller';

export function createMainRoutes(): Router {
    const router = Router();
    const homeController = container.resolve(HomeController)

    router.get('/' , homeController.index.bind(homeController))

    return router
}