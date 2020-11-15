import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

import { BaseEntity } from "../BaseEnitity";
import { Transaction } from "../transactions/Transaction";
import { User } from "../User";

@ObjectType({ description: "The account model" })
@Entity()
export class Account extends BaseEntity {
  @Field({ description: "The name of the account" })
  @Property()
  name!: string;

  @Field({ description: "A short description of the account", nullable: true })
  @Property({ type: "text", nullable: true })
  description?: string;

  @Field({ description: "The user who owns the account" })
  @ManyToOne()
  owner!: User;

  @Field({ description: "Wether the account is active or not" })
  @Property()
  active: boolean = true;

  // NOTE: Moved to field resolver
  // @Field({ description: "The current balance of the account" })
  // @Property()
  // balance!: number;


  @Field({ description: "The balance the user set when creating the account" })
  @Property()
  initalBalance!: number;

  @Field(() => [Transaction], {
    name: "transactions",
    description: "All the transactions of the account",
    nullable: true,
  })
  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions? = new Collection<Transaction>(this);
}
