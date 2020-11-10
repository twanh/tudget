import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

import { Account } from "./accounts/Account";
import { BaseEntity } from "./BaseEnitity";
import { Category } from "./groupings/Category";
import { Expense } from "./transactions/Expense";
import { Income } from "./transactions/Income";
import { Tag } from "./groupings/Tag";

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

  // Accounts
  @OneToMany(() => Account, (account) => account.owner, { nullable: true })
  accounts? = new Collection<Account>(this);

  // Transactions
  // Expenses
  @OneToMany(() => Expense, (expense) => expense.owner, { nullable: true })
  expenses? = new Collection<Expense>(this);
  // Income
  @OneToMany(() => Income, (income) => income.owner, { nullable: true })
  income? = new Collection<Income>(this);

  // Groupings
  @OneToMany(() => Tag, (tag) => tag.owner, { nullable: true })
  tags? = new Collection<Tag>(this);
  @OneToMany(() => Category, (category) => category.owner, { nullable: true })
  categories? = new Collection<Category>(this);
}
