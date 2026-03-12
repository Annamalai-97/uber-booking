import Redis from "ioredis";
import logger from "../utils/logger";

// const redis = new Redis({
//     host:process.env.REDIS_HOST || "localhost",
//     port: Number(process.env.REDIS_PORT) || 6379
// });
const redis = new Redis(process.env.REDIS_URI as string);


redis.on("connect", () => logger.info("Redis Connected"));
redis.on("error", (err: Error) => logger.error(`Redis Error: ${err.message}`));
export default redis;
