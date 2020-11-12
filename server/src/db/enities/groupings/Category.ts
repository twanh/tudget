import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

import { BaseEntity } from "../BaseEnitity";
import { User } from "../User";

@ObjectType({ description: "The category model" })
@Entity()
export class Category extends BaseEntity {
  @Field({ description: "The name of the category" })
  @Property()
  name!: string;

  @Field({ description: "The description of the category", nullable: true })
  @Property({ type: "text", nullable: true })
  description?: string;

  @Field(() => User, {
    description: "The user who owns the category (the creator)",
  })
  @ManyToOne()
  owner!: User;
}
