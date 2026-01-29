import { inject, injectable } from "tsyringe"
import { RoleRepository } from "../repositories/role.repository"
import { AppDataSource } from "../../../../database/data-source"
import { UnprocessableEntityError } from "../../../../infrastructure/errors/UnporcessableEntityError"
import { In } from "typeorm"
import { DeleteEntityDto } from "../../../../infrastructure/dtos/delete-entity.dto"
import { RoleDto } from "../dtos/role.dto"
import { RoleEntity } from "../entities/role.entity"
import { RolesMenusEntity } from "../entities/role-menus.entity"

@injectable()
export class RoleService {

    constructor(
        private readonly roleRepository: RoleRepository
    ) {
    }

    public async create(data: RoleDto): Promise<RoleEntity> {

        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {

            const createData : Partial<RoleEntity> = {
                name: data.name,
                code: data.code,
                isAdmin: data.isAdmin,
                isUserApp: data.isUserApp,
                status: data.status,
            }
    
            const role = await queryRunner.manager.save(RoleEntity, createData)
    
            const roleMenus : Partial<RolesMenusEntity>[] = data.menus.map((menu) => {
                return {
                    roleId: role.id,
                    menuId: menu.id,
                    order: menu.order,
                    action: menu.action,
                    groupName: menu.groupName,
                    groupId: menu.groupId,
                }
            })

            await queryRunner.manager.save(RolesMenusEntity, roleMenus)
            await queryRunner.commitTransaction()

            return role

        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }

    }

    public async update(data: RoleDto, _id: string) {

        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {

            let roleUpdate = await this.roleRepository.findById(_id)

            if (roleUpdate == null) throw new UnprocessableEntityError("invalid _id Menus entity")

            roleUpdate.name = data.name
            roleUpdate.code = data.code
            roleUpdate.isAdmin = data.isAdmin
            roleUpdate.isUserApp = data.isUserApp

            if (data.menus && data.menus.length > 0) {
                await queryRunner.manager.delete(RolesMenusEntity, {
                    roleId: roleUpdate.id
                })
                const roleMenus : Partial<RolesMenusEntity>[] = data.menus.map((menu) => {
                    return {
                        roleId: roleUpdate.id,
                        menuId: menu.id,
                        order: menu.order,
                        action: menu.action,
                        groupName: menu.groupName,
                        groupId: menu.groupId,
                    }
                })
                await queryRunner.manager.save(RolesMenusEntity, roleMenus)
            }

            roleUpdate.status = data.status

            await queryRunner.manager.update(RoleEntity, _id, roleUpdate)

            await queryRunner.commitTransaction()

            return roleUpdate
            
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }
    }

    public async multiDelete(data: DeleteEntityDto) {

        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            await queryRunner.manager.softDelete(RoleEntity, {
                id: In(data.ids as string[]),
            });
            await queryRunner.commitTransaction()
            
            return true
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw error
        } finally {
            await queryRunner.release()
        }


    }

}