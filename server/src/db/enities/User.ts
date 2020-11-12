import { Entity, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

import { BaseEntity } from "./BaseEnitity";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  // The username of the user
  @Field(() => String, { description: "The username of the user" })
  @Property({ type: "text", unique: true })
  username!: string;

  // The email adress of the user
  @Field(() => String, { description: "The emailadress of the user" })
  @Property({ type: "text", unique: true })
  email!: string;

  // Password does not have the @Field decorated
  // because it should not be exposed to the graphql api
  @Property({ type: "text" })
  password!: string;
}
