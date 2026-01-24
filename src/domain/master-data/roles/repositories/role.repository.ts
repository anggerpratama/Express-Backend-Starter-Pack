import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { RoleEntity } from "../entities/role.entity";
import { IPagination } from "../../../../infrastructure/interfaces/IPagination";
import { PaginationRequestParser } from "../../../../infrastructure/paginations/pagination-request-parser";
import { RoleDto } from "../dtos/role.dto";
import { UnprocessableEntityError } from "../../../../infrastructure/errors/UnporcessableEntityError";

@injectable()
export class RoleRepository {
    
    constructor(
        @inject("RoleEntityRepository")
        private readonly roleRepository: Repository<RoleEntity>,
    ) {}

    // getting data

    public async listIndex(pagination : IPagination , filter : any): Promise<[RoleEntity[], number]> {

        const {limit , skip} = PaginationRequestParser(pagination)

        return await this.roleRepository.findAndCount({
            where: filter,
            take: limit,
            skip: skip,
            order: {
                createdAt: 'DESC'
            }
        })
        
    }

    public async showDetailData(_id: string): Promise<RoleEntity | null> {
        return await this.roleRepository.findOne({
            where: {
                id: _id
            }
        })
    }

    public async findById(_id:string) : Promise<RoleEntity | null>{
        
        return await this.roleRepository.findOne({
            where: {id: _id}
        })

    }

    // setting data
    public async create(data:RoleDto) {
        return await this.roleRepository.save(data)
    }
}