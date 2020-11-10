import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";

import { BaseEntity } from "../BaseEnitity";
import { Expense } from "../transactions/Expense";
import { Income } from "../transactions/Income";
import { User } from "../User";

@Entity()
export class Account extends BaseEntity {
  @Property()
  name!: string;

  @Property({ type: "text", nullable: true })
  description?: string;

  @ManyToOne()
  owner!: User;

  @Property()
  active: boolean = true;

  @Property()
  balance!: number;

  // Transactions
  // Expenses
  @OneToMany(() => Expense, (expense) => expense.account, { nullable: true })
  expenses? = new Collection<Expense>(this);
  // Income
  @OneToMany(() => Income, (income) => income.account, { nullable: true })
  income? = new Collection<Income>(this);
}
