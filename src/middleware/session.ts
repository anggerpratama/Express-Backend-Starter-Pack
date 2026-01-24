import session from "express-session";
import { RedisStore } from "connect-redis";
import { container } from "tsyringe";
import { RedisCache } from "../infrastructure/cache/redis.cache";
import config from "../config/cache";
import appConfig from "../config/app";

export async function getSessionMiddleware() {
  const redisService = container.resolve(RedisCache);
  await redisService.connect();

  return session({
    store: new RedisStore({
      client: redisService.client,
      prefix: "sess:", // Good practice for organized keys in Redis
    }),
    secret: config.session_key,
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
      httpOnly: true, // Prevents XSS attacks
      secure: appConfig.app_env === "production", // HTTPS only in production
      maxAge: 1000 * 60 * 60 * 24, // 1 day expiration
      sameSite: "lax", // Protects against CSRF
    },
  });
}