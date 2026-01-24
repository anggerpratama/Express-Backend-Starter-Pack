import bcrypt from 'bcrypt';
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { UserEntity } from "../../domain/users/entities/user.entity";
import { RoleEntity } from "../../domain/master-data/roles/entities/role.entity";

export default class UserSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<any> {
        const repository = dataSource.getRepository(UserEntity);
        const roleRepository = dataSource.getRepository(RoleEntity);
        const role = await roleRepository.findOne({ where: { code: 'ADMIN' } });
        if (!role) {
            throw new Error('Role not found');
        }
        const salt = await bcrypt.genSalt(15);

        const hashPassword = await bcrypt.hash('admin123', salt);
        await repository.insert([
            { name: 'Admin', email: 'admin@gov.id' , password: hashPassword , roleId: role.id, createdAt: new Date() , status: true }
        ]);

        console.log('🍏 User seeded successfully');
    }
}