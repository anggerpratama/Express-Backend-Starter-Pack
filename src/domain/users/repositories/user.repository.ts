import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { IPagination } from "../../../infrastructure/interfaces/IPagination";
import { PaginationRequestParser } from "../../../infrastructure/paginations/pagination-request-parser";
import { UserDto } from "../dtos/user.dto";

@injectable()
export class UserRepository {
    
    constructor(
        @inject("UserEntityRepository")
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    // getting data

    public async listIndex(pagination : IPagination , filter : any): Promise<[UserEntity[], number]> {

        const {limit , skip} = PaginationRequestParser(pagination)

        return await this.userRepository.findAndCount({
            where: filter,
            take: limit,
            skip: skip,
            order: {
                createdAt: 'DESC'
            }
        })
        
    }

    public async showDetailData(_id: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({
            where: {
                id: _id
            }
        })
    }

    public async findByParamsWIRole(params: any): Promise<UserEntity | null> {
        return await this.userRepository.findOne({
            where: params,
            relations: {
                role: {
                    roleMenus: true
                },
            }
        })
    }

    // setting data
    public async create(data:UserDto) {
        return await this.userRepository.save(data)
    }

    public async update(id: string, data: UserEntity) {
        return await this.userRepository.update(id, data)
    }
}