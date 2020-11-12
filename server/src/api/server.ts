import { ApolloContext, ExtraContext } from "src/types/types";

import { AccountResolver } from "./resolvers/Account";
import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import { UserResolver } from "./resolvers/User";
import { __prod__ } from "../constants";
import { authChecker } from "./authChecker";
import { buildSchema } from "type-graphql";

/**
 * Create the apollo server and attaches it to the express app
 *
 * @param ctx {ExtraContext} The context to add to the server (see src/types)
 * @param app {Express} The express app to attachk the server to
 */
export async function setupServer(
  ctx: ExtraContext,
  app: Express
): Promise<ApolloServer> {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, AccountResolver],
      validate: true,
      authChecker, // Use a custom function to check if an user is loggedin
    }),
    debug: !__prod__,
    context: ({ req, res }): ApolloContext => ({ req, res, ...ctx }),
  });

  apolloServer.applyMiddleware({
    app,
    // cors: { origin: "http://localhost:3000", credentials: true },
  });

  return apolloServer;
}
