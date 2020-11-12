import { Account } from "./enities/accounts/Account";
import { BaseEntity } from "./enities/BaseEnitity";
import { Category } from "./enities/groupings/Category";
import { MikroORM } from "@mikro-orm/core";
import { Tag } from "./enities/groupings/Tag";
import { Transaction } from "./enities/transactions/Transaction";
import { User } from "./enities/User";
import dotenv from "dotenv-safe";
import path from "path";

// Load env variables
dotenv.config();

export default {
  type: "postgresql",
  dbName: process.env.PG_DATABASE,
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  debug: true, // Turn of in prod
  entities: [BaseEntity, User, Transaction, Account, Tag, Category],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.ts$/,
  },
} as Parameters<typeof MikroORM.init>[0];
