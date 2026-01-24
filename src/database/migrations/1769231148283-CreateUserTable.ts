import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1769231148283 implements MigrationInterface {
    name = 'CreateUserTable1769231148283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phoneNumber" character varying, "name" character varying NOT NULL, "nik" character varying, "nip" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, "sessionId" character varying, "lastLogin" TIMESTAMP WITH TIME ZONE, "expiredSessionTime" TIMESTAMP WITH TIME ZONE, "profilePicture" character varying, "status" boolean NOT NULL, "roleId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
