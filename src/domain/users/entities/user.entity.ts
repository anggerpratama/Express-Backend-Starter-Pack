import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ForeignKey, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleEntity } from "../../master-data/roles/entities/role.entity";


@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column("varchar" ,{ nullable: true })
    phoneNumber!: string | null;

    @Column("varchar" ,{ nullable: false })
    name!: string;

    @Column("varchar" ,{ nullable: true })
    nik!: string | null;

    @Column("varchar" ,{ nullable: true })
    nip!: string | null;

    @Column("varchar" ,{ nullable: false })
    email!: string;

    @Column("varchar" ,{ nullable: false })
    password!: string;

    @Column("varchar" ,{ nullable: true })
    sessionId!: string | null;

    @Column("timestamptz" ,{ nullable: true })
    lastLogin!: Date | null;

    @Column("timestamptz" ,{ nullable: true })
    expiredSessionTime!: Date | null;

    @Column("varchar" ,{ nullable: true })
    profilePicture!: string | null;

    @Column("boolean" ,{ nullable: false })
    status!: boolean;

    // Relationship Entities
    @Column("varchar" ,{ nullable: false })
    @ForeignKey(() => RoleEntity)
    roleId!: string;

    @ManyToOne(() => RoleEntity, (role) => role.users)
    role?: RoleEntity;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP', nullable: true })
    updatedAt!: Date | null;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt!: Date | null;
}