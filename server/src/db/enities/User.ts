import { Entity, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

import { BaseEntity } from "./BaseEnitity";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  // The username of the user
  @Field(() => String)
  @Property({ type: "text", unique: true })
  username!: string;

  // The email adress of the user
  @Field(() => String)
  @Property({ type: "text", unique: true })
  email!: string;

  // Password does not have the @Field decorated
  // because it should not be exposed to the graphql api
  @Property({ type: "text" })
  password!: string;

  // Relations

  // // Accounts
  // @OneToMany(() => Account, (account) => account.owner, { nullable: true })
  // accounts? = new Collection<Account>(this);

  // // Transactions
  // @OneToMany(() => Transaction, (transaction) => transaction.owner)
  // transactions = new Collection<Transaction>(this);

  // // Groupings
  // @OneToMany(() => Tag, (tag) => tag.owner, { nullable: true })
  // tags? = new Collection<Tag>(this);
  // @OneToMany(() => Category, (category) => category.owner, { nullable: true })
  // categories? = new Collection<Category>(this);
}
