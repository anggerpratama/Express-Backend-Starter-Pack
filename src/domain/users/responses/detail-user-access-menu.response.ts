import { MenuEntity } from "../../master-data/menus/entities/menu.entity"

export class DetailUserAccessMenuResponse {
    groupId!: string
    groupName!: string
    menus!: (MenuEntity | undefined)[]
}