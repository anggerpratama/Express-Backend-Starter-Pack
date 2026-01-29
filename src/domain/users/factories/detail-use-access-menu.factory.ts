import { MenuEntity } from "../../master-data/menus/entities/menu.entity"
import { RolesMenusEntity } from "../../master-data/roles/entities/role-menus.entity"
import { DetailUserAccessMenuResponse } from "../responses/detail-user-access-menu.response"

export const DetailUserAccessMenuFactory = (roleMenus : RolesMenusEntity[]) => {

    const result : DetailUserAccessMenuResponse[] = []

    const joinedEntity = Array.from(
        new Set(
            [...roleMenus]
        )
    )
    
    const unGroupedMenu = joinedEntity.filter(rlmn => rlmn.groupId == null).map(rlmn => {
        return {
            ...rlmn.menu,
            actionMenu: rlmn.action
        }
    }) as MenuEntity[]
    const uniqueGroupIds = Array.from(
        new Set(
            joinedEntity
                .filter(rlmn => rlmn.groupId !== null)
                .map(rlmn => rlmn.groupId!)
        )
    );

    // assign non group menus
    result.push({
        groupId : "main",
        groupName: "Utama",
        menus: unGroupedMenu,
    })
    // assign group menu
    for (const uniqueId of uniqueGroupIds) {
        result.push({
            groupId : uniqueId,
            groupName: joinedEntity.find(rlmn => rlmn.groupId === uniqueId)?.groupName ?? "",
            menus: joinedEntity.filter(rlmn => rlmn.groupId === uniqueId).map(rlmn => {
                return {
                    ...rlmn.menu,
                    actionMenu: rlmn.action
                }
            }) as MenuEntity[],
        })  
    }

    return result
    
}