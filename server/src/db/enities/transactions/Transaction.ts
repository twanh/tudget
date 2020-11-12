import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  Property,
} from "@mikro-orm/core";

import { Account } from "../accounts/Account";
import { BaseEntity } from "../BaseEnitity";
import { Category } from "../groupings/Category";
import { Tag } from "../groupings/Tag";
import { User } from "../User";

export enum TransactionType {
  EXPENSE,
  INCOME,
}

@Entity()
export class Transaction extends BaseEntity {
  @Property()
  name!: string;

  @Property({ type: "text", nullable: true })
  description?: string;

  @Property()
  amount: number;

  @ManyToOne(() => User, { nullable: false })
  owner!: User;

  @ManyToOne(() => Account, { nullable: false })
  account: Account;

  @Enum()
  type!: TransactionType;

  @Property()
  spendOn: Date;

  @ManyToOne(() => Category, { nullable: true })
  category?: Category;

  @ManyToMany({ entity: () => Tag, owner: true, nullable: true })
  tags? = new Collection<Tag>(this);
}
