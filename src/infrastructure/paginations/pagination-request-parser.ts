
import { IPagination } from "../interfaces/IPagination";

export const PaginationRequestParser = function(pagination: IPagination) {

    let limit: number | undefined = 10
    let skip: number | undefined = 0

    if(Object.keys(pagination).length !== 0) {
        if ((pagination.limit != null && pagination.limit != undefined) && (pagination.page != null && pagination.page != undefined)) {
            limit = parseInt(pagination.limit)
            skip = (parseInt(pagination.page) - 1) * limit
        }
    }

    if (limit == 0) {
        limit = undefined
    }
    if (skip == 0) {
        skip = undefined
    }

    return {limit: limit , skip: skip}
} 