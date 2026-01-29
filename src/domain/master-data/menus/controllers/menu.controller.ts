import { Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { Controller } from "../../../controller";
import { MenuRepository } from "../repositories/menu.repository";
import { MenusRequest } from "../requests/menu.request";
import { StringFunction } from "../../../../infrastructure/functions/string-function";
import { RealEscapeStringParam } from "../../../../infrastructure/functions/real-escape-string-param";
import { paginateResultFunc } from "../../../../infrastructure/paginations/pagination-result";
import { ILike } from "typeorm";
import { MenuService } from '../services/menu.service';
import { MenuDto } from '../dtos/menu.dto';
import { DeleteEntityDto } from '../../../../infrastructure/dtos/delete-entity.dto';

@injectable()
export class MenuController extends Controller {

    // config
    private readonly MODUL_NAME: string = "Menus"

    constructor(
        // repositories
        private readonly menuRepository: MenuRepository,
        // services
        private readonly menuService: MenuService,
    ) {
        super()
    }

    /**
     * Retrieves a paginated list of Menus, optionally filtered by search parameters.
     *
     * @param req - Express request with optional search and pagination query.
     * @param res - Express response to send the result.
     */
    public async index (req : MenusRequest , res : Response){

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

        const [result , count] = await this.menuRepository.listIndex(req.query , filter)

        const paginationResult = await paginateResultFunc(req , count)

        return this.responseBuilder.successWithPagination(res , `Sukses Mendapatkan Data ${this.MODUL_NAME} List` , paginationResult, result)

    }

    /**
     * Get detail of a Menus by its ID.
     *
     * @param req - Express request with Menus ID in params.
     * @param res - Express response to send the result.
     */
    public async show (req : MenusRequest , res : Response){

        try {
            const detailMenus = await this.menuRepository.showDetailData(req.params._id)

            return this.responseBuilder.successMessage(res , `Sukses Mendapatkan Data ${this.MODUL_NAME} Detail` , 
                detailMenus
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
    public async store(req : MenusRequest , res : Response){
        
        try {
            const result = await this.menuService.create(req.body as MenuDto)
            return this.responseBuilder.successMessage(res , `Sukses Membuat Data Baru : ${this.MODUL_NAME}` , result)
        } catch (error) {
            this.errorHandleResponse(error , `Gagal Membuat Data Baru : ${this.MODUL_NAME}` , res)
        }

    }

    /**
     * Multiple Creates a new Menus.
     *
     * @param req - Express request containing the Menus data in the body.
     * @param res - Express response to send the result.
     */
    public async multipleStore(req : MenusRequest , res : Response){
        
        try {
            const result = await this.menuService.multipleCreate(req.body as MenuDto[])
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
    public async update(req : MenusRequest , res : Response){
        try {
            const result = await this.menuService.update(req.body as MenuDto, req.params._id)
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
    public async delete(req : MenusRequest , res : Response){

        try {
            const result = await this.menuService.multiDelete(req.body as DeleteEntityDto)
            return this.responseBuilder.successMessage(res , `Sukses Membuat Data Baru : ${this.MODUL_NAME}` , result)
        } catch (error) {
            this.errorHandleResponse(error , `Gagal Membuat Data Baru : ${this.MODUL_NAME}` , res)
        }

    }

}