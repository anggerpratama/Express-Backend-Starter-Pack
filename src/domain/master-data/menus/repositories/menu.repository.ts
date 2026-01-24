import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { MenuEntity } from "../entities/menu.entity";
import { IPagination } from "../../../../infrastructure/interfaces/IPagination";
import { PaginationRequestParser } from "../../../../infrastructure/paginations/pagination-request-parser";
import { MenuDto } from "../dtos/menu.dto";

@injectable()
export class MenuRepository {
    
    constructor(
        @inject("MenuEntityRepository")
        private readonly menuRepository: Repository<MenuEntity>,
    ) {}

    // getting data

    public async listIndex(pagination : IPagination , filter : any): Promise<[MenuEntity[], number]> {

        const {limit , skip} = PaginationRequestParser(pagination)

        return await this.menuRepository.findAndCount({
            where: filter,
            take: limit,
            skip: skip,
            order: {
                createdAt: 'DESC'
            }
        })
        
    }

    public async showDetailData(_id: string): Promise<MenuEntity | null> {
        return await this.menuRepository.findOne({
            where: {
                id: _id
            }
        })
    }

    public async findMasterMenuByApiUrl(urlApi : string) : Promise<MenuEntity | null> {
        return await this.menuRepository.findOne({
            where: { apiSlug: urlApi },
        });
    }

    // setting data
    public async create(data:MenuDto) {
        return await this.menuRepository.save(data)
    }
}