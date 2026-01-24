import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RolesMenusEntity } from "./role-menus.entity";
import { UserEntity } from "../../../users/entities/user.entity";

@Entity('roles')
export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false })
    code!: string;

    @Column({ default: false })
    isAdmin!: boolean;

    @Column({ default: false })
    isUserApp!: boolean;

    @Column({ default: false })
    status!: boolean;

    // Relationship Entities
    @OneToMany(() => RolesMenusEntity, (role_menus) => role_menus.role)
    roleMenus!: RolesMenusEntity[];

    @OneToMany(() => UserEntity, (user) => user.role)
    users?: UserEntity[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt!: Date | null;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt!: Date | null;
}