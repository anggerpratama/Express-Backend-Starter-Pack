import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMenusTable1769163226368 implements MigrationInterface {
    name = 'CreateMenusTable1769163226368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "menus" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "webSlug" character varying NOT NULL, "apiSlug" character varying NOT NULL, "actionMenu" character varying array NOT NULL, "iconCode" character varying NOT NULL, "status" boolean NOT NULL DEFAULT false, "isRecursive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_3fec3d93327f4538e0cbd4349c4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "menus"`);
    }

}
