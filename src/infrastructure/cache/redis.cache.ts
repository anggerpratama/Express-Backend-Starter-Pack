import { createClient, RedisClientType } from "redis";
import cacheConfig from "../../config/cache";
import { injectable } from "tsyringe";

@injectable()
export class RedisCache {
    public client : ReturnType<typeof createClient>;

    constructor() {
        this.client = createClient({
            url: cacheConfig.redis_url,
        })

        this.client.on("error", (err) => console.error("Redis Client Error", err));
    }

    async connect() {
        if (!this.client.isOpen) {
            await this.client.connect();
            console.log("✅ Redis connected successfully");
        }
    }
}