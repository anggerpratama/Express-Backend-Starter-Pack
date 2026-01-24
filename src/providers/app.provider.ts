import { Express } from "express";
import express from 'express'

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import * as path from 'path'
import { getSessionMiddleware } from "../middleware/session";

export async function appProvider(appProvider: Express):Promise<void> {
    appProvider.use(bodyParser.json({limit : '50mb'}))
    appProvider.use(bodyParser.urlencoded({ extended:false }))

    appProvider.use(cookieParser())
    appProvider.use(express.static(path.join(__dirname, 'public')))

    // appProvider.use(await getSessionMiddleware())

    console.log("✅ App Providers Initialized");
}