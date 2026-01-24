import { Response } from "express"
import { ForbiddenError } from "../infrastructure/errors/ForbiddenError"
import { UnauthorizedAppError } from "../infrastructure/errors/UnauthorizedAppError"
import { UnprocessableEntityError } from "../infrastructure/errors/UnporcessableEntityError"
import { ResponseBuilders } from "../infrastructure/responses/ResponseBuilders"

export class Controller {

    protected responseBuilder: ResponseBuilders

    constructor(){

        this.responseBuilder = new ResponseBuilders()

    }

    protected errorHandleResponse(error: any , message:string,  res: Response){
        
        if (error instanceof UnprocessableEntityError){
            return this.responseBuilder.errorsMessage(res , error.message , error.status , error)                
        }
        if (error instanceof UnauthorizedAppError){
            return this.responseBuilder.errorsMessage(res , message , error.status , error)                
        }
        if (error instanceof ForbiddenError){
            return this.responseBuilder.errorsMessage(res , message , error.status , error)                
        }
        // log all internal server error 500
        // this.manageAppLogsService.create(<ICreateLogs>{
        //     message: '[500]' + message,
        //     stack_trace: JSON.stringify(error),
        //     types: LogsTypes.APPLICATION,
        //     status: LogsStatus.ERROR
        // })
        return this.responseBuilder.errorsMessage(res , message , 500 , error)

    }

}