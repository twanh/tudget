import {
  Connection,
  EntityManager,
  IDatabaseDriver,
  MikroORM,
} from "@mikro-orm/core";

import ormConfig from "./mikro-orm.config";

/**
 * Setup the databse with
 * @returns The enitiy manager of the orm
 */
export async function setupDb(): Promise<
  EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
> {
  // Create the orm
  const orm = await MikroORM.init(ormConfig);
  // Automaticly apply migrations
  await orm.getMigrator().up();
  // Return the enitiy manager
  return orm.em;
}
