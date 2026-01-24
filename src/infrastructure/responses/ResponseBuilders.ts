// import { IPaginationResult } from "../app/infrastructures/Paginations/PaginationResult";

import { IPaginationResult } from "../paginations/pagination-result";

export class ResponseBuilders {

    /**
     * 
     * Response Success Builders
     * 
     * @param res 
     * @param message 
     * @param code 
     * @param data 
     */

    public successMessage(res:any , message: string , data: any) : any{

        res.status(200);
        res.json({
            status: true,
            message: message,
            data: data
        });

    }

    /**
     * 
     * Response Success Builders For Pagination
     * 
     * @param res 
     * @param message 
     * @param code 
     * @param data 
     */

     public successWithPagination(res:any , message: string , pagination : IPaginationResult, data: any) : any{

        res.status(200);
        res.json({
            status: true,
            message: message,
            pagination : pagination,
            data: data
        });

    }

    /**
     * 
     * Response Success Builders For Custom Field
     * 
     * @param res 
     * @param message 
     * @param code 
     * @param data 
     */

    public successWithCustom(res:any , object: any) : any{

        res.status(200);
        res.json(object);

    }

    /**
     * 
     * Response Errors Builder
     * 
     * @param res 
     * @param message 
     * @param code 
     * @param errors 
     */

    public errorsMessage(res:any , message: string , code: number , errors: any) : any{

        res.status(code);
        res.json({
            status: false,
            message: message,
            errors : errors
        });

    }

    /**
     * 
     * Response Errors Builder
     * 
     * @param res 
     * @param message 
     * @param code 
     * @param errors 
     */

    public errorsValidator(res:any , message: string , code: number , errors: any) : any{

        res.status(code);
        res.json({
            status: false,
            message: message,
            errors : errors.errors
        });

    }

}