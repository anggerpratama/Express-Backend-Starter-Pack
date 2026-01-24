
import config from '../../../config/app'
import { Request, Response } from "express";
import { Controller } from '../../controller';
import { injectable } from 'tsyringe';

@injectable()
export class HomeController extends Controller {

    async index(req:Request , res:Response){
        let data = {
            name: config.app_name,
            status: "Active",
            env: config.app_env,
            version: config.app_version,
        }
        return this.responseBuilder.successMessage(res , "Success get home endpoint" , data)
    }

}