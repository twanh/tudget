import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from "@mikro-orm/core";

import { BaseEntity } from "../BaseEnitity";
import { Transaction } from "../transactions/Transaction";
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
  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions = new Collection<Transaction>(this);
}
