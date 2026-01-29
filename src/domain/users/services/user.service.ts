import * as bcrypt from 'bcrypt'

import { inject, injectable } from "tsyringe"
import { In } from "typeorm"
import { UserRepository } from "../repositories/user.repository"
import { UserDto } from "../dtos/user.dto"
import { UserEntity } from "../entities/user.entity"
import { UnprocessableEntityError } from "../../../infrastructure/errors/UnporcessableEntityError"
import { RoleRepository } from '../../master-data/roles/repositories/role.repository'
import { DeleteEntityDto } from '../../../infrastructure/dtos/delete-entity.dto'
import { AppDataSource } from '../../../database/data-source'

@injectable()
export class UserService {

    constructor(
        // repositories
        private readonly userRepository: UserRepository,
        private readonly rolesRepository: RoleRepository
    ) {
    }

    public async create(data: UserDto): Promise<UserEntity> {

        let hashPassword = null
        if (data.password != null) {
            const salt = await bcrypt.genSalt(15)

            hashPassword = await bcrypt.hash(data.password , salt)
        }

        // find roles
        const role = await this.rolesRepository.findById(data.roleId)
        // savety check roles required
        if (role == null) throw new UnprocessableEntityError("Data Hak Akses tidak ditemukan")

        const createData = {
            name: data.name,
            nik: data.nik,
            nip: data.nip,
            email: data.email,
            password: hashPassword ?? "",
            phoneNumber: data.phoneNumber,
            profilePicture: data.profilePicture,
            status: data.status,
            roleId: role.id,
        }

        const user = await this.userRepository.create(createData)

        return user

    }

    public async update(data: UserDto, _id: string) {

        let userUpdate = await this.userRepository.showDetailData(_id)

        if (userUpdate == null) throw new UnprocessableEntityError("invalid _id User entity")

        // find roles
        const role = await this.rolesRepository.findById(data.roleId)
        // savety check roles required
        if (role == null) throw new UnprocessableEntityError("Data Hak Akses tidak ditemukan")

        userUpdate.name = data.name
        userUpdate.nik = data.nik
        userUpdate.nip = data.nip
        userUpdate.email = data.email
        
        // password optional update
        if (data.password != null) {
            const salt = await bcrypt.genSalt(15)
            userUpdate.password = await bcrypt.hash(data.password , salt)
        }

        userUpdate.phoneNumber = data.phoneNumber
        userUpdate.profilePicture = data.profilePicture ?? null
        userUpdate.roleId = role.id
        userUpdate.status = data.status

        await userUpdate.save()

        return userUpdate

    }

    public async multiDelete(data: DeleteEntityDto) {

        const queryRunner = AppDataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            await queryRunner.manager.softDelete(UserEntity, {
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