
export class UnprocessableEntityError extends Error {

    public status: number    
    public message: string

    constructor(message: string){
        super()

        this.status = 422
        this.message = message
    }

}