import { Column, BaseEntity, Entity, ForeignKey, ManyToOne, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleEntity } from "./role.entity";
import { MenuEntity } from "../../menus/entities/menu.entity";


@Entity('roles_menus')
export class RolesMenusEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ForeignKey(() => RoleEntity)
    @Column({ nullable: false })
    roleId!: string;

    @ForeignKey(() => MenuEntity)
    @Column({ nullable: false })
    menuId!: string;

    @Column({ nullable: false })
    order!: number;
    
    @Column("varchar" , { array: true, nullable: true })
    action!: string[] | null;

    @Column("varchar" , { nullable: true })
    groupName!: string | null;

    @Column("varchar" , { nullable: true })
    groupId!: string | null;

    // Relationship Entity
    
    @ManyToOne(() => RoleEntity, (role) => role.roleMenus)
    role!: RoleEntity;

    @ManyToOne(() => MenuEntity, (menu) => menu.roleMenus)
    menu?: MenuEntity;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt!: Date | null;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt!: Date | null;

}