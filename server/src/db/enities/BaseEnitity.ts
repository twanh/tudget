import { Field, Int, ObjectType } from "type-graphql";
import { PrimaryKey, Property } from "@mikro-orm/core";

@ObjectType()
export abstract class BaseEntity {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
