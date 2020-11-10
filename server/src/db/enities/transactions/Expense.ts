import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from "@mikro-orm/core";

import { Account } from "../accounts/Account";
import { BaseEntity } from "../BaseEnitity";
import { Category } from "../groupings/Category";
import { Tag } from "../groupings/Tag";
import { User } from "../User";

@Entity()
export class Expense extends BaseEntity {
  @Property()
  name!: string;

  @Property({ type: "text", nullable: true })
  description?: string;

  @Property()
  amount: number;

  @ManyToOne(() => Account)
  account!: Account;

  @ManyToOne()
  owner!: User;

  @Property()
  spendOn: Date;

  @ManyToOne()
  category?: Category;

  @ManyToMany({ entity: () => Tag, owner: true, nullable: true })
  tags? = new Collection<Tag>(this);
}
