import { Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { ILike } from "typeorm";
import { Controller } from '../../controller';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { UsersRequest } from '../requests/user.request';
import { StringFunction } from '../../../infrastructure/functions/string-function';
import { RealEscapeStringParam } from '../../../infrastructure/functions/real-escape-string-param';
import { paginateResultFunc } from '../../../infrastructure/paginations/pagination-result';
import { UserDto } from '../dtos/user.dto';
import { DeleteEntityDto } from '../../../infrastructure/dtos/delete-entity.dto';

@injectable()
export class UserController extends Controller {

    // config
    private readonly MODUL_NAME: string = "Users"

    constructor(
        // repositories
        private readonly userRepository: UserRepository,
        // services
        private readonly userService: UserService,
    ) {
        super()
    }

    /**
     * Retrieves a paginated list of Menus, optionally filtered by search parameters.
     *
     * @param req - Express request with optional search and pagination query.
     * @param res - Express response to send the result.
     */
    public async index (req : UsersRequest , res : Response){

        let filter : any = {}

        if (StringFunction.IsRealNotEmpty(req.query.search)) {
            const searchValue = RealEscapeStringParam(req.query.search as string);
            filter = [
                { name: ILike(`%${searchValue}%`) },
                { webSlug: ILike(`%${searchValue}%`) },
                { apiSlug: ILike(`%${searchValue}%`) },
            ];
        }
        if (StringFunction.IsRealNotEmpty(req.query.types)) {
            filter['types'] = req.query.types
        }

        const [result , count] = await this.userRepository.listIndex(req.query , filter)

        const paginationResult = await paginateResultFunc(req , count)

        return this.responseBuilder.successWithPagination(res , `Sukses Mendapatkan Data ${this.MODUL_NAME} List` , paginationResult, result)

    }

    /**
     * Get detail of a Menus by its ID.
     *
     * @param req - Express request with Menus ID in params.
     * @param res - Express response to send the result.
     */
    public async show (req : UsersRequest , res : Response){

        try {

            const detailUser = await this.userRepository.showDetailData(req.params._id)

            return this.responseBuilder.successMessage(res , `Sukses Mendapatkan Data ${this.MODUL_NAME} Detail` , 
                detailUser
            )

        } catch (error) {
            this.errorHandleResponse(error , `Gagal Mendapatkan Data ${this.MODUL_NAME}` , res)            
        }

    }

    /**
     * Creates a new Menus.
     *
     * @param req - Express request containing the Menus data in the body.
     * @param res - Express response to send the result.
     */
    public async store(req : UsersRequest , res : Response){
        
        try {
            const result = await this.userService.create(req.body as UserDto)
            return this.responseBuilder.successMessage(res , `Sukses Membuat Data Baru : ${this.MODUL_NAME}` , result)
        } catch (error) {
            this.errorHandleResponse(error , `Gagal Membuat Data Baru : ${this.MODUL_NAME}` , res)
        }

    }

    /**
     * Updates a Menus by ID.
     *
     * @param req - Request with Menus data and ID.
     * @param res - Response to send the result.
     */
    public async update(req : UsersRequest , res : Response){
        try {
            const result = await this.userService.update(req.body as UserDto, req.params._id)
            return this.responseBuilder.successMessage(res , `Sukses Merubah Data : ${this.MODUL_NAME}` , result)
        } catch (error) {
            this.errorHandleResponse(error , `Gagal Merubah Data : ${this.MODUL_NAME}` , res)
        }

    }

    /**
     * Deletes one or more Menus by their IDs.
     *
     * @param req - Express request containing an array of Menus IDs in the body.
     * @param res - Express response to send the result.
     */
    public async delete(req : UsersRequest , res : Response){

        try {
            const result = await this.userService.multiDelete(req.body as DeleteEntityDto)
            return this.responseBuilder.successMessage(res , `Sukses Membuat Data Baru : ${this.MODUL_NAME}` , result)
        } catch (error) {
            this.errorHandleResponse(error , `Gagal Membuat Data Baru : ${this.MODUL_NAME}` , res)
        }

    }

}