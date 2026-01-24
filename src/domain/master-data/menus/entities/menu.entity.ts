import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RolesMenusEntity } from "../../roles/entities/role-menus.entity";

@Entity('menus')
export class MenuEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false })
    webSlug!: string;

    @Column({ nullable: false })
    apiSlug!: string;

    @Column("varchar" , { array: true, nullable: false })
    actionMenu!: string[];

    @Column({ nullable: false })
    iconCode!: string;

    @Column({ default: false })
    status!: boolean;

    @Column({ default: true })
    isRecursive!: boolean;

    // Relationship Entity
    @OneToMany(() => RolesMenusEntity, (role_menus) => role_menus.menu)
    roleMenus!: RolesMenusEntity[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt!: Date | null;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt!: Date | null;
}