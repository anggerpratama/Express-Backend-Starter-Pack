import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { RoleEntity } from "../../domain/master-data/roles/entities/role.entity";
import { MenuEntity } from "../../domain/master-data/menus/entities/menu.entity";
import { RolesMenusEntity } from "../../domain/master-data/roles/entities/role-menus.entity";

export default class RoleSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<any> {
        const repository = dataSource.getRepository(RoleEntity);
        await repository.insert([
            { name: 'Administrator' , code: 'ADMIN' , status: true , isAdmin: true , isUserApp:false, createdAt: new Date() },
        ]);

        const role = await repository.findOne({ where: { code: 'ADMIN' } });
        if (!role) {
            throw new Error('Role not found');
        }

        const menuRepository = dataSource.getRepository(MenuEntity);
        const roleMenuRepository = dataSource.getRepository(RolesMenusEntity);

        const getAllMenu = await menuRepository.find()
        const roleMenus : Partial<RolesMenusEntity>[] = []
        for (let index = 0; index < getAllMenu.length; index++) {
            const element = getAllMenu[index];
            roleMenus.push({
                roleId: role.id,
                menuId: element.id,
                order: index + 1,
                action: element.actionMenu,
                createdAt: new Date()
            })
        }
        await roleMenuRepository.insert(roleMenus);

        console.log('🍏 Role seeded successfully');
    }
}