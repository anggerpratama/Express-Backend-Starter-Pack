import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import database from "../config/database";
import initMigration from "./migrations/init.migration";
import entities from "../domain/entity.module";
import { SeederOptions } from "typeorm-extension";
import initSeeder from "./seeds/init.seeder";

const options: DataSourceOptions & SeederOptions = {
    type: "postgres",
    host: database.postgres.db_host,
    port: parseInt(database.postgres.db_port),
    username: database.postgres.db_user,
    password: database.postgres.db_password,
    database: database.postgres.db_name,
    synchronize: false, // Set to false in production! Use migrations.
    logging: true,
    entities: entities, // List your entity classes here
    migrations: initMigration.migrations,
    migrationsTableName: "migrations_history",
    subscribers: [],
    seeds: initSeeder.seeder
}

export const AppDataSource = new DataSource(options);