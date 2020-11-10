import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Request, Response } from "express";

export type ExtraContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};

export interface MyContext extends ApolloContext, ExtraContext {}

export type ApolloContext = {
  req: Request;
  res: Response;
};
