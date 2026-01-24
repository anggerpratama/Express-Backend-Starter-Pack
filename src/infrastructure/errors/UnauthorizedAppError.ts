
export class UnauthorizedAppError extends Error {

    public status: number    
    public message: string

    constructor(message: string){
        super()

        this.status = 401
        this.message = message
    }

}