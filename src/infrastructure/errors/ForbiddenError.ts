
export class ForbiddenError extends Error {

    public status: number    
    public message: string

    constructor(message: string){
        super()

        this.status = 403
        this.message = message
    }

}