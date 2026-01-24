import { inject, injectable } from "tsyringe"
import { RoleRepository } from "../repositories/role.repository"
import { AppDataSource } from "../../../../database/data-source"
import { UnprocessableEntityError } from "../../../../infrastructure/errors/UnporcessableEntityError"
import { In } from "typeorm"
import { DeleteEntityDto } from "../../../../infrastructure/dtos/delete-entity.dto"
import { RoleDto } from "../dtos/role.dto"
import { RoleEntity } from "../entities/role.entity"

@injectable()
export class RoleService {

    constructor(
        private readonly roleRepository: RoleRepository
    ) {
    }

    public async create(data: RoleDto): Promise<RoleEntity> {

        const createData = {
            name: data.name,
            code: data.code,
            isAdmin: data.isAdmin,
            isUserApp: data.isUserApp,
            menus: data.menus,
            status: data.status,
        }

        const menu = await this.roleRepository.create(createData)

        return menu

    }

    public async update(data: RoleDto, _id: string) {

        let roleUpdate = await this.roleRepository.showDetailData(_id)

        if (roleUpdate == null) throw new UnprocessableEntityError("invalid _id Menus entity")

        roleUpdate.name = data.name
        roleUpdate.code = data.code
        roleUpdate.isAdmin = data.isAdmin
        roleUpdate.isUserApp = data.isUserApp

        roleUpdate.status = data.status

        await roleUpdate.save()

        return roleUpdate

    }

    public async multiDelete(data: DeleteEntityDto) {

        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            await queryRunner.manager.softDelete(RoleEntity, {
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