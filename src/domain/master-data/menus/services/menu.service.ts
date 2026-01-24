import { inject, injectable } from "tsyringe"
import { MenuDto } from "../dtos/menu.dto"
import { MenuRepository } from "../repositories/menu.repository"
import { MenuEntity } from "../entities/menu.entity"
import { AppDataSource } from "../../../../database/data-source"
import { UnprocessableEntityError } from "../../../../infrastructure/errors/UnporcessableEntityError"
import { In } from "typeorm"
import { DeleteEntityDto } from "../../../../infrastructure/dtos/delete-entity.dto"

@injectable()
export class MenuService {

    constructor(
        private readonly menuRepository: MenuRepository
    ) {
    }

    public async create(data: MenuDto): Promise<MenuEntity> {

        const createData = {
            name: data.name,
            webSlug: data.webSlug,
            apiSlug: data.apiSlug,
            actionMenu: data.actionMenu,
            iconCode: data.iconCode,
            status: data.status,
            isRecursive: data.isRecursive
        }

        const menu = await this.menuRepository.create(createData)

        return menu 

    }

    public async multipleCreate(data: MenuDto[]) {

        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const createMultipleData = []

            for (const menu of data) {
                createMultipleData.push({
                    name: menu.name,
                    webSlug: menu.webSlug,
                    apiSlug: menu.apiSlug,
                    actionMenu: menu.actionMenu,
                    iconCode: menu.iconCode,
                    status: menu.status,
                    isRecursive: menu.isRecursive
                })
            }

            let result = await queryRunner.manager.save(MenuEntity, createMultipleData)
            await queryRunner.commitTransaction()

            return result
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }

    }

    public async update(data: MenuDto, _id: string) {

        let menuUpdate = await this.menuRepository.showDetailData(_id)

        if (menuUpdate == null) throw new UnprocessableEntityError("invalid _id Menus entity")

        menuUpdate.name = data.name
        menuUpdate.webSlug = data.webSlug
        menuUpdate.apiSlug = data.apiSlug
        menuUpdate.actionMenu = data.actionMenu
        menuUpdate.iconCode = data.iconCode
        menuUpdate.status = data.status
        menuUpdate.isRecursive = data.isRecursive

        await menuUpdate.save()

        return menuUpdate

    }

    public async multiDelete(data: DeleteEntityDto) {

        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            await queryRunner.manager.softDelete(MenuEntity, {
                id: In(data.ids as string[]),
            });
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }


    }

}