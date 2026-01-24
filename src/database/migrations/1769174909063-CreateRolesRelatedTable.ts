import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRolesRelatedTable1769174909063 implements MigrationInterface {
    name = 'CreateRolesRelatedTable1769174909063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "isUserApp" boolean NOT NULL DEFAULT false, "status" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_menus" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roleId" uuid NOT NULL, "menuId" uuid NOT NULL, "order" integer NOT NULL, "action" character varying array, "groupName" character varying, "groupId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_b0d9a8735904d27daaa5ffd45f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "roles_menus" ADD CONSTRAINT "FK_0ece158a25996e97c46c0b46af2" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_menus" ADD CONSTRAINT "FK_b5f345522b16cc95e5d0ae9f3e3" FOREIGN KEY ("menuId") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_menus" DROP CONSTRAINT "FK_b5f345522b16cc95e5d0ae9f3e3"`);
        await queryRunner.query(`ALTER TABLE "roles_menus" DROP CONSTRAINT "FK_0ece158a25996e97c46c0b46af2"`);
        await queryRunner.query(`DROP TABLE "roles_menus"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
