export interface IPaginationResult {
    limit : number
    page : number
    total_data : number
    total_pages : number
    page_controls : number[]
    start : number
    end : number
}

export const paginateResultFunc = async function(req: any , totalData: number) {

    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    
    const start = ((page - 1) * limit) + 1
    let end = (start + limit) - 1

    if (end > totalData) end = totalData
    const totalPage = Math.ceil(totalData / limit)
    
    let page_control = []
    let index = 0
    if (totalPage > 1) {
        let startPage = 2
        let endPage = totalPage

        if (totalPage > 7) {
            if (page < 5) {
                endPage = 5
            }else if (page >= (totalPage - 3)) {
                startPage = totalPage - 5
                endPage = totalPage
            }
            else {
                startPage = page - 2
                endPage = page + 2
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            page_control[index] = i
            index++
        }
    }

    return <IPaginationResult> {
        limit : limit,
        page : page,
        total_data : totalData,
        total_pages : totalPage,
        page_controls : page_control,
        start : start,
        end : end
    }
}