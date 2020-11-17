import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType, registerEnumType } from "type-graphql";

import { Account } from "../accounts/Account";
import { BaseEntity } from "../BaseEnitity";
import { Category } from "../groupings/Category";
import { Tag } from "../groupings/Tag";
import { User } from "../User";

// Defines wether an transactions is an expense or an income
export enum TransactionType {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
}

// Makes sure that type-graphql can access the enum correctly
registerEnumType(TransactionType, {
  name: "TransactionType",
  description:
    "Defines wether a transactions is an expense or an income transaction",
});

@ObjectType({ description: "The transaction model" })
@Entity()
export class Transaction extends BaseEntity {
  @Field({ description: "The name of the transaction" })
  @Property()
  name!: string;

  @Field({ description: "The description of the transaction", nullable: true })
  @Property({ type: "text", nullable: true })
  description?: string;

  @Field({ description: "The amount that was spend with this transactions" })
  @Property()
  amount!: number;

  @Field(() => User, { description: "The owner (creator) of the transaction" })
  @ManyToOne(() => User, { nullable: false })
  owner!: User;

  @Field(() => Account, {
    description:
      "The account to wich this transactions belongs (was made from)",
  })
  @ManyToOne(() => Account, { nullable: false })
  account!: Account;

  @Field(() => TransactionType, {
    description:
      "Defines wether a transactions is an expense or an income transaction",
  })
  @Enum()
  type!: TransactionType;

  @Field(() => Date, {
    description: "The date the transaction was made on",
    nullable: true,
  })
  @Property()
  spendOn?: Date;

  @Field(() => Category, {
    description: "The category this transaction fits in",
    nullable: true,
  })
  @ManyToOne(() => Category, { nullable: true })
  category?: Category;

  @Field(() => [Tag], {
    description: "The tags this transaction has been assigned to", // TODO: Rephrase descriptions
    nullable: true,
  })
  @ManyToMany({ entity: () => Tag, owner: true, nullable: true })
  tags? = new Collection<Tag>(this);
}
