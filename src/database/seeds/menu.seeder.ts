import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { MenuEntity } from "../../domain/master-data/menus/entities/menu.entity";

export default class MenuSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<any> {
        const repository = dataSource.getRepository(MenuEntity);
        await repository.insert([
            { 
                name: 'Dashboard',
                webSlug: '/backoffice',
                apiSlug: '/dashboard',
                actionMenu: ['Create', 'View', 'Update', 'Delete'],
                iconCode: 'GridIcon',
                status: true,
                isRecursive: false,

                createdAt: new Date(),
            },
            { 
                name: 'Hak Akses',
                webSlug: '/backoffice/master-data/roles',
                apiSlug: '/master-data/roles',
                actionMenu: ['Create', 'View', 'Update', 'Delete'],
                iconCode: 'LockIcon',
                status: true,
                isRecursive: true,

                createdAt: new Date(),
            },
            { 
                name: 'Data Menu',
                webSlug: '/backoffice/master-data/menus',
                apiSlug: '/master-data/menus',
                actionMenu: ['Create', 'View', 'Update', 'Delete'],
                iconCode: 'ArchiveIcon',
                status: true,
                isRecursive: true,

                createdAt: new Date(),
            },
            { 
                name: 'Data User',
                webSlug: '/backoffice/users',
                apiSlug: '/users',
                actionMenu: ['Create', 'View', 'Update', 'Delete'],
                iconCode: 'UserCircleIcon',
                status: true,
                isRecursive: true,

                createdAt: new Date(),
            },
            { 
                name: 'Icons',
                webSlug: '/backoffice/master-data/list-icons',
                apiSlug: '/master-data/list-icons',
                actionMenu: ['Create', 'View', 'Update', 'Delete'],
                iconCode: 'SettingsIcon',
                status: true,
                isRecursive: true,

                createdAt: new Date(),
            },

        ]);

        console.log('🍏 Menu seeded successfully');
    }
}