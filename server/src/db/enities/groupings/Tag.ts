import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

import { BaseEntity } from "../BaseEnitity";
import { Transaction } from "../transactions/Transaction";
import { User } from "../User";

@ObjectType({ description: "The tag model" })
@Entity()
export class Tag extends BaseEntity {
  @Field({ description: "The name of the tag" })
  @Property()
  name!: string;

  @Field({ description: "The description of the tag", nullable: true })
  @Property({ type: "text", nullable: true })
  description?: string;

  @Field({ description: "The user who owns the tag (the creator of the tag)" })
  @ManyToOne(() => User)
  owner!: User;

  @Field(() => [Tag], {
    description: "The transactions associated with the tag",
    nullable: true,
  })
  @Field(() => [Transaction], {
    description: "The transactions that are tagged with the current tag",
    nullable: true,
  })
  @ManyToMany({ entity: () => Tag, owner: true, nullable: true })
  transactions? = new Collection<Transaction>(this);
}
