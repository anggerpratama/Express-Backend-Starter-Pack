import { container } from "tsyringe";
import { DataSource } from "typeorm";
import entities from "../domain/entity.module";


export async function setupContainer(dataSource: DataSource) {
    // Register TypeORM repositories
    entities.forEach(entity => {
        container.register(entity.name + "Repository", {
            useValue: dataSource.getRepository(entity)
        });
    });

    console.log("✅ DI Container configured");
}