import connectRedis from "connect-redis";
import cors from "cors";
import dotenv from "dotenv-safe";
import express from "express";
import redis from "redis";
import session from "express-session";
import { setupDb } from "./db";
import { setupServer } from "./api/server";

async function main() {
  // Load env variables
  dotenv.config();

  try {
    // Create the database
    const enitityManager = await setupDb();
    // Create the express app
    const app = express();

    // Create the redis store
    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient({
      // tslint:disable-next-line: radix
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    });

    app.use(
      cors({
        origin: "http://locahost:3000",
        credentials: true,
      })
    );

    // Use session middleware to be able to create coockies on the frontend
    app.use(
      session({
        name: process.env.COOCKIE_NAME,
        store: new RedisStore({
          client: redisClient,
          disableTouch: true,
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
          sameSite: "lax",
          httpOnly: true,
          secure: false,
        },
        secret: process.env.COOCKIE_SECRET,
        resave: false,
        saveUninitialized: false,
      })
    );

    // Create the apollo server
    await setupServer({ em: enitityManager }, app);
    // Start the server on the port specified in the envirment variables
    app.listen(process.env.PORT, () => {
      console.log("Server started on port:", process.env.PORT);
    });
  } catch (error) {
    console.error("Main error:", error);
  }
}

main();
