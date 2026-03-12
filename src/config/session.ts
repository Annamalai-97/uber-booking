import session from "express-session";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import logger from "../utils/logger";

const redisClient = createClient({
  url: process.env.REDIS_URI as string,
});

redisClient.connect().catch((err) => {
  logger.error(`Session Redis Error: ${err.message}`);
});

redisClient.on("connect", () => logger.info("Session Redis Connected"));

const redisStore = new RedisStore({ client: redisClient });

const sessionMiddleware = session({
  store: redisStore,
  secret: process.env.SESSION_SECRET || "session_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
});

export default sessionMiddleware;