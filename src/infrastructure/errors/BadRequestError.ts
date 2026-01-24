export class BadRequestError extends Error {

    public status: number    
    public message: string

    constructor(message: string){
        super()

        this.status = 400
        this.message = message
    }

}